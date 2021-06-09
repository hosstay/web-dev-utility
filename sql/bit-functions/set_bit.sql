CREATE OR REPLACE FUNCTION set_bit (table_name text, column_name text, index integer, system_flag bit, new_bit integer, id integer) RETURNS INTEGER AS $$
DECLARE
	text_flag text = '';
	target_bit text = '';
	transformation_string text = '00000000000000000000000000000000';
	query text = '';
	retval INTEGER = -1;
BEGIN
	IF system_flag IS NULL THEN
		text_flag = '00000000000000000000000000000000';
	ELSE
		text_flag = CAST(system_flag AS text);
	END IF;
	
	transformation_string = substring(transformation_string from 0 for index) || '1' || substring(transformation_string from index for length(transformation_string) - index);

	IF new_bit = 1 THEN
		query = 'UPDATE ' || table_name || ' SET ' || column_name || ' = b''' || text_flag || ''' | b''' || transformation_string || ''' WHERE id = ' || id || ' RETURNING id;';
	ELSE
		query = 'UPDATE ' || table_name || ' SET ' || column_name || ' = b''' || text_flag || ''' & (b''' || transformation_string || ''' # b''11111111111111111111111111111111'') WHERE id = ' || id || ' RETURNING id;';
	END IF;

	EXECUTE query
	INTO retval;

	RETURN retval;
END; $$ 
LANGUAGE plpgsql;


--examples:
SELECT set_bit('table_name', 'system_flags', 2, system_flags, 1) FROM mdx_group_overview WHERE id = 7124;