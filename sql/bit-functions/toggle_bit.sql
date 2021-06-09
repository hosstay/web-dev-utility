CREATE OR REPLACE FUNCTION toggle_bit (table_name text, column_name text, index integer, system_flag bit, id integer) RETURNS INTEGER AS $$
DECLARE
	text_flag text = '';
	target_bit text = '';
	transformation_string text = '00000000000000000000000000000000';
	retval INTEGER = -1;
BEGIN
	IF system_flag IS NULL THEN
		text_flag = '00000000000000000000000000000000';
	ELSE
		text_flag = CAST(system_flag AS text);
	END IF;

	target_bit = substring(system_flag from index for 1);
	
	IF target_bit = '1' THEN
		transformation_string = substring(transformation_string from 0 for index) || '1' || substring(transformation_string from index for length(transformation_string) - index);
		EXECUTE 'UPDATE ' || table_name || ' SET ' || column_name || ' = b''' || text_flag || ''' # b''' || transformation_string || ''' WHERE id = ' || id || ' RETURNING id;'
		INTO retval;
	ELSE
		transformation_string = substring(transformation_string from 0 for index) || '1' || substring(transformation_string from index for length(transformation_string) - index);
		EXECUTE 'UPDATE ' || table_name || ' SET ' || column_name || ' = b''' || text_flag || ''' | b''' || transformation_string || ''' WHERE id = ' || id || ' RETURNING id;'
		INTO retval;
	END IF;

	RETURN retval;
END; $$ 
LANGUAGE plpgsql;


--examples:
SELECT toggle_bit('table_name', 'system_flags', 2, system_flags) FROM mdx_group_overview WHERE id = 7068;