CREATE OR REPLACE FUNCTION ta() 
RETURNS TRIGGER AS $$
BEGIN 
    IF NEW.d_age <18 and IF NEW.d_age>50 THEN
        RAISE EXCEPTION 'Invalid Age';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER a 
BEFORE INSERT ON DRIVER 
FOR EACH ROW 
EXECUTE FUNCTION ta();


CREATE OR REPLACE FUNCTION  driver_details(dname VARCHAR) 
RETURNS TABLE(duty_date DATE) AS $$
DECLARE 
    dno int;
BEGIN
    SELECT driver_no INTO dno
    FROM DRIVER 
    WHERE driver_name = dname;

    IF dno = 0 THEN 
    RAISE EXCEPTION 'INVALIS ENTRY';
    END IF;

    RETURN QUERY
    SELECT bd.duty_date
    FROM BUS_DRIVER bd
    WHERE bd.driver_no = dno;

END;
$$ LANGUAGE plpgsql;
