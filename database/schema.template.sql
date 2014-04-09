
--
-- Name: ${ databaseName }; Type: DATABASE; Schema: -; Owner: -
--

DROP DATABASE IF EXISTS ${ databaseName };
CREATE DATABASE ${ databaseName };

\connect ${ databaseName }

drop schema public cascade;
create schema public;

--
-- Name: enum_users_usertype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE enum_users_usertype AS ENUM (
    'farmer',
    'researcher'
);

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id SERIAL NOT NULL,
    email character varying(255) NOT NULL UNIQUE ,
    usertype enum_users_usertype NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    organization character varying(255) NOT NULL,
    farmlatitude double precision,
    farmlongitude double precision,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);



--
-- Name: croptypes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE croptypes (
    id SERIAL NOT NULL,
    croptype character varying(255) NOT NULL UNIQUE,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);

--
-- Name: cropsessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE cropsessions (
    id SERIAL NOT NULL,
    userid integer NOT NULL REFERENCES Users(id),
    cropname character varying(255) NOT NULL,
    croptypeid integer REFERENCES CropTypes(id),
    area integer NOT NULL,
    startdate timestamp with time zone NOT NULL,
    initialstagelength integer NOT NULL,
    developmentstagelength integer NOT NULL,
    midstagelength integer NOT NULL,
    latestagelength integer NOT NULL,
    kcinitial double precision NOT NULL,
    kcmid double precision NOT NULL,
    kcend double precision NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT unique_user_and_cropname UNIQUE(userId, cropName)
);

--
-- Name: irrigationevents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE irrigationevents (
    id SERIAL NOT NULL,
    cropSessionId integer REFERENCES cropsessions(id) ON DELETE CASCADE,
    irrigationdate timestamp with time zone NOT NULL,
    irrigationvolume double precision NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);
--
-- Name: defaultcropdata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE defaultcropdata (
    id SERIAL,
    croptypeid integer NOT NULL REFERENCES CropTypes(id),
    initialstagelength integer NOT NULL,
    developmentstagelength integer NOT NULL,
    midstagelength integer NOT NULL,
    latestagelength integer NOT NULL,
    kcinitial double precision NOT NULL,
    kcmid double precision NOT NULL,
    kcend double precision NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

--
-- Name: goesvariables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE goesvariables (
    variablename character varying(255) NOT NULL,
    description text,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(variablename)
);

--
-- Name: goesdata; Type: TABLE; Schema: public; Owner: -
--
-- TODO decide dataDate type
CREATE TABLE goesdata (
    id SERIAL NOT NULL,
    variablename character varying(255) REFERENCES goesvariables(variablename),
    matrixrow integer NOT NULL,
    matrixcolumn integer NOT NULL,
    datavalue double precision NOT NULL,
    datadate timestamp with time zone NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

--
-- Name: goesmaps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE goesmaps (
    variablename character varying(255) NOT NULL,
    imagepath character varying(255) NOT NULL,
    datadate timestamp with time zone NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    PRIMARY KEY(variableName, dataDate, createdat),
    FOREIGN KEY (variableName) REFERENCES goesVariables(variableName)
);

CREATE VIEW LatestRainfallData AS
    SELECT a.* FROM GoesData AS a
    INNER JOIN (
        SELECT dataDate, max(createdAt) AS latest
        FROM GoesData
        WHERE variableName='rainfall'
        GROUP BY dataDate
    ) AS d
    ON a.dataDate = d.datadate
    AND a.createdAt = d.latest
    WHERE variableName = 'rainfall';

CREATE VIEW LatestReferenceETData AS
    SELECT a.* FROM GoesData AS a
    INNER JOIN (
        SELECT dataDate, max(createdAt) AS latest
        FROM GoesData
        WHERE variableName='reference_ET_PenmanMonteith'
        GROUP BY dataDate
    ) AS d
    ON a.dataDate = d.datadate
    AND a.createdAt = d.latest
    WHERE variableName = 'reference_ET_PenmanMonteith';
