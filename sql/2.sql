CREATE OR REPLACE FUNCTION tb(bno int,ddate DATE) 
RETURNS TABLE VOID AS $$
DECLARE 
    dname VARCHAR(20);
    found_bus INT;
BEGIN
    SELECT bus_no INTO found_bus 
    FROM BUS 
    WHERE bus_no = bno;

    IF found_bus IS NULL THEN 
        RAISE EXCEPTION 'INVALID BUS NUMBER';
    END IF;

    FOR dname IN 
        SELECT d.driver_name FROM DRIVER d
        JOIN BUS_DRIVER bd ON d.driver_no=bd.driver_no
        WHERE bd.bus_no = bno AND bd.duty_date = date
    LOOP
        RAISE NOTICE 'DRIVER : %',dname;
    END LOOP;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ass() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.capacity < 10 THEN 
        RAISE EXCEPTION 'BUS Capacity should not be less than 10 ';
    END IF;
    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER aa 
BEFORE INSERT ON BUS 
FOR EACH ROW 
EXECUTE FUNCTION ass();
