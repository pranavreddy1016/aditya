CREATE OR REPLACE FUNCTION display_student_details(
    student_class VARCHAR
)
RETURNS VOID
AS $$
DECLARE
    sname VARCHAR(20);
    subject_name VARCHAR(20);
    tname CHAR(10);
    marks INTEGER;

    cur CURSOR FOR
        SELECT
            S.s_name,
            ST.subject,
            T.t_name,
            ST.marks_scored
        FROM Student S
        JOIN Student_Teacher ST
            ON S.s_no = ST.s_no
        JOIN Teacher T
            ON ST.t_no = T.t_no
        WHERE S.class = student_class;

BEGIN

    OPEN cur;

    LOOP
        FETCH cur INTO sname, subject_name, tname, marks;

        EXIT WHEN NOT FOUND;

        RAISE NOTICE
        'Student: %, Subject: %, Teacher: %, Marks: %',
        sname, subject_name, tname, marks;

    END LOOP;

    CLOSE cur;

END;
$$ LANGUAGE plpgsql;
