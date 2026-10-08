CREATE OR REPLACE FUNCTION ass3() 
RETURNS VOID AS $$
DECLARE 
    r record;
    cur cursor FOR 
        SELECT * FROM BUS 
        WHERE route_no = 1;

BEGIN
    OPEN cur;
    LOOP
        FETCH cur INTO r;

        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'BUS No : %, Capacity : %, Depot : %',
                r.bus_no,
                r.capacity,
                r.depot_name;
    
    END LOOP;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION t3() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.capacity = 0 THEN
        RAISE EXCEPTION 'Invalid Entery ';
    END IF;
    RETURN NEW;

END;

$$ LANGUAGE plpgsql;


CREATE TRIGGER ch 
BEFORE INSERT OR UPDATE ON BUS 
FOR EACH ROW 
EXECUTE PROCEDURE t3();
-- Procedure or function 