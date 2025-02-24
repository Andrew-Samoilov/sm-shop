--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: shshopuser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO shshopuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: shshopuser
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    website text,
    country text,
    logo text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.brands OWNER TO shshopuser;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: shshopuser
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO shshopuser;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shshopuser
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: models; Type: TABLE; Schema: public; Owner: shshopuser
--

CREATE TABLE public.models (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "brandId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.models OWNER TO shshopuser;

--
-- Name: models_id_seq; Type: SEQUENCE; Schema: public; Owner: shshopuser
--

CREATE SEQUENCE public.models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.models_id_seq OWNER TO shshopuser;

--
-- Name: models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shshopuser
--

ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;


--
-- Name: tyres; Type: TABLE; Schema: public; Owner: shshopuser
--

CREATE TABLE public.tyres (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    country character varying(50),
    date_code character(4),
    applicability character varying(50),
    sku character varying(50) NOT NULL,
    inventory_quantity integer DEFAULT 0,
    price numeric(10,2) NOT NULL,
    load_speed_index character varying(10),
    brand character varying(50),
    model character varying(100),
    width numeric(4,1),
    profile numeric(4,1),
    constr character(1),
    diameter numeric(4,1),
    delimiter character(1),
    load_index character varying(10),
    speed_index character(1),
    type character varying(50),
    brand_id integer,
    model_id integer
);


ALTER TABLE public.tyres OWNER TO shshopuser;

--
-- Name: tires_id_seq; Type: SEQUENCE; Schema: public; Owner: shshopuser
--

CREATE SEQUENCE public.tires_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tires_id_seq OWNER TO shshopuser;

--
-- Name: tires_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shshopuser
--

ALTER SEQUENCE public.tires_id_seq OWNED BY public.tyres.id;


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: models id; Type: DEFAULT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);


--
-- Name: tyres id; Type: DEFAULT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.tyres ALTER COLUMN id SET DEFAULT nextval('public.tires_id_seq'::regclass);


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: shshopuser
--

COPY public.brands (id, name, description, website, country, logo, created_at, updated_at) FROM stdin;
7	Cooper	Cooper Tires — американська компанія, що спеціалізується на виробництві шин для різних авто.	https://www.coopertire.com/	USA	https://logos-world.net/wp-content/uploads/2021/08/Cooper-Tires-Logo.png	2025-02-20 11:40:54.822	2025-02-20 11:40:54.822
8	Dunlop	Dunlop — британський бренд шин, відомий високоякісними шинами для різних умов.	https://www.dunloptires.com/	UK	https://www.carlogos.org/logo/Dunlop-logo-3840x2160.png	2025-02-20 11:40:54.822	2025-02-20 11:40:54.822
19	Kapsen	Kapsen — китайський бренд, що спеціалізується на вантажних та легкових шинах.	\N	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
1	Aplus	Aplus — китайський виробник шин, відомий своєю широкою лінійкою продукції.	https://aplus-tyres.com/	Китай	https://aplus-tyres.com/images/logo.svg	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
2	Apollo	Apollo Tyres — індійська компанія, що виробляє шини для легкових автомобілів, вантажівок та автобусів.	https://www.apollotyres.com/	Індія	https://companieslogo.com/img/orig/APOLLO-tyres.png	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
3	AUSTONE	AUSTONE — китайський бренд шин, що пропонує шини для легкових автомобілів.	http://www.austonetyre.com/	Китай	https://www.tyroola.co.nz/images/brands/austone.png	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
9	Federal	Federal — тайванський виробник шин, що спеціалізується на спортивних та всесезонних шинах.	https://www.federaltire.com/	Тайвань	https://www.federaltire.com/logo.svg	2025-02-20 11:40:54.822	2025-02-20 12:46:04.073
10	Firestone	Firestone — дочірня компанія Bridgestone, що виробляє високоякісні шини для різних автомобілів.	https://www.firestonetire.com/	США	https://upload.wikimedia.org/wikipedia/commons/5/5f/Firestone.svg	2025-02-20 11:40:54.822	2025-02-20 12:46:04.073
17	Fulda	Fulda — німецький виробник шин, що спеціалізується на надійних шинах для будь-яких погодних умов.	https://www.fulda.com/	Німеччина	https://upload.wikimedia.org/wikipedia/commons/4/4a/Fulda_logo.svg	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
11	Goodyear	Goodyear — один з найбільших виробників шин у світі з багаторічною історією.	https://www.goodyear.com/	США	https://upload.wikimedia.org/wikipedia/commons/4/44/Goodyear_logo.svg	2025-02-20 11:40:54.822	2025-02-20 12:46:04.073
12	Hankook	Hankook — південнокорейський виробник шин, що відомий своєю якістю та технологіями.	https://www.hankooktire.com/	Південна Корея	https://upload.wikimedia.org/wikipedia/commons/6/6c/Hankook_Tire_logo.svg	2025-02-20 11:40:54.822	2025-02-20 12:46:04.073
4	BF Goodrich	BF Goodrich — американський виробник шин, що спеціалізується на позашляхових та високопродуктивних шинах.	https://www.bfgoodrichtires.com/	США	https://vectorseek.com/wp-content/uploads/2021/01/BF-Goodrich-Logo-Vector.jpg	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
5	Bridgestone	Bridgestone — японська компанія, один з найбільших виробників шин.	https://www.bridgestone.com/	Японія	https://brandslogos.com/wp-content/uploads/images/large/bridgestone-logo.png	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
20	Kingrun	Kingrun — китайський виробник шин, що пропонує широкий асортимент продукції.	\N	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
21	Kleber	Kleber — французький виробник шин середнього класу, що належить Michelin.	https://www.kleber-tyres.com/	Франція	https://upload.wikimedia.org/wikipedia/commons/3/3e/Kleber_logo.svg	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
22	Kormoran	Kormoran — польський бренд шин, що пропонує бюджетні та середні за якістю шини.	https://www.kormoran-tyres.com/	Польща	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
23	Lassa	Lassa — турецький бренд шин, що входить до групи Bridgestone.	https://www.lassatyres.com/	Туреччина	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
24	Laufenn	Laufenn — бренд шин, створений компанією Hankook для європейського ринку.	https://www.laufenn.com/	Південна Корея	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
25	Matador	Matador — словацький виробник шин, що входить до групи Continental.	https://www.matador.sk/	Словаччина	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
26	Nexen	Nexen — корейський виробник шин, що пропонує якісні шини середнього рівня.	https://www.nexentire.com/	Південна Корея	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
27	Roadmarch	Roadmarch — китайський бренд шин, що виробляє бюджетні моделі для легкових авто.	\N	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
28	Roadstone	Roadstone — бренд шин, створений компанією Nexen.	https://www.roadstonetyres.com/	Південна Корея	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
6	Continental	Continental — німецький виробник преміальних шин.	https://www.continental-tires.com/	Німеччина	/brands-logo/continental-logo.svg	2025-02-20 11:40:54.822	2025-02-20 12:41:44.964
14	Pirelli	Pirelli — італійський виробник шин, відомий високою якістю та технологіями.	https://www.pirelli.com/	Italy	/brands-logo/pirelli-logo.svg	2025-02-20 11:40:54.822	2025-02-20 11:40:54.822
15	Nokian	Nokian — фінський виробник шин, відомий своєю спеціалізацією на зимових шинах.	https://www.nokiantyres.com/	Фінляндія	/brands-logo/nokian-tyres.svg	2025-02-20 11:40:54.822	2025-02-20 12:46:04.073
29	Sailun	Sailun — китайський виробник шин з широким асортиментом моделей.	https://www.sailuntire.com/	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
30	Sava	Sava — словенський бренд шин, що належить Goodyear.	https://www.sava-tires.com/	Словенія	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
31	TIGAR	TIGAR — сербський виробник шин, що належить Michelin.	https://www.tigar-tyres.com/	Сербія	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
32	Toyo	Toyo — японський виробник шин преміального сегмента.	https://www.toyotires.com/	Японія	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
33	Triangle	Triangle — китайський виробник шин, що пропонує широкий асортимент.	https://www.triangle.com.cn/	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
34	VREDESTEIN	VREDESTEIN — голландський виробник преміальних шин.	https://www.vredestein.com/	Нідерланди	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
35	WESTLAKE	WESTLAKE — китайський бренд шин з конкурентними цінами.	https://www.westlaketyre.com/	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
13	Michelin	Michelin — французька компанія, один із світових лідерів у виробництві шин.	https://www.michelin.com/	France	/brands-logo/michelin-logo.svg	2025-02-20 11:40:54.822	2025-02-20 11:40:54.822
16	Diamondback	Diamondback — виробник шин середнього класу, що пропонує надійні шини за доступними цінами.	\N	США	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
18	GRENLANDER	GRENLANDER — китайський бренд шин, що пропонує бюджетні варіанти для легкових автомобілів.	\N	Китай	\N	2025-02-20 12:19:13.412	2025-02-20 12:46:04.073
\.


--
-- Data for Name: models; Type: TABLE DATA; Schema: public; Owner: shshopuser
--

COPY public.models (id, name, description, "brandId", "createdAt", "updatedAt") FROM stdin;
2	XL Nexen WinGuard Sport 2 WU7 SUV FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
3	XL TIGAR ICE пш	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
4	XL Nexen WinGuard ice 3	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
5	XL Nexen NBlue HD Plus	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
6	XL Nexen NFera RU5 SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
7	XL AUSTONE ATHENA SP-302 A/T	\N	3	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
8	Latitude Sport 3 N0	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
9	XL Roadstone NFera AU5 FR	\N	28	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
10	XL Michelin Pilot Sport 4 SUV FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
11	WinGuard SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
12	Atrezzo 4 Seasons FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
13	XL Pirelli PZero PZ4 RUN FLAT * FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
14	COLO H01	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
15	XL Nexen WinGuard Ice 3	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
16	XL Michelin Pilot Alpin 5 SUV	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
17	Observe GSi6 SUV FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
18	WinGuard WinSpike 3 пш	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
19	Road Performance FR	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
20	XL Matador Hectorra 5 FR	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
21	Eskimo S3+	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
22	XL Sava Eskimo HP 2	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
23	MULTIWAYS-C	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
24	Commercio 4 Seasons	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
25	XL Kormoran SUMMER SUV FR	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
26	XL Laufenn G FIT EQ+ LK41	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
27	XL Michelin Pilot Sport 4 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
28	Pilot Sport 4 AO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
29	XL Firestone ROADHAWK 2 FR	\N	10	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
30	G FIT EQ+ LK41	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
31	Observe GSi5 Б/У FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
32	XL Continental ContiPremiumContact 5 МО (б/у до 5000 км.) FR	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
33	SW608 Snowmaster	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
34	XL Michelin X-Ice Snow SUV FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
35	XL Fulda EcoControl HP 2 FR	\N	17	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
36	XL Michelin Latitude Sport 3 ZP * FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
37	WinGuard ice 3	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
38	XL GRENLANDER ENRI U08 FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
39	MASPIRE M/T	\N	3	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
40	XL Lassa COMPETUS A/T3	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
41	XL Michelin Pilot Alpin 5 * FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
42	XL Nexen WinGuard WinSpike 3 пш FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
43	WinGuard Sport 2 WU7 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
44	WinGuard SnowG WH2	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
45	XL Nexen WinGuard Ice Plus WH43	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
46	XL Nexen NFera RU1 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
47	TERRAMAX A/T OWL FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
48	SW618	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
49	I FIT+ LW31	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
50	XL WESTLAKE Z-507 Zuper Snow	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
51	Himalaya WS2 пш FR	\N	9	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
52	NFera RU5 SUV FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
53	Cinturato P7 * FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
54	XL GRENLANDER COLO H02	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
55	Roadian HTX RH5 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
56	XL Michelin X-Ice Snow FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
57	XL Nokian WR Snowproof P	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
58	XL Laufenn G FIT 4S LH71 FR	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
59	XL TIGAR WINTER SUV FR	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
60	XL Matador MP-93 Nordicca	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
61	Cinturato Winter KS	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
62	All Terrain A929 OWL	\N	1	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
63	Ice Blazer Alpine+ FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
64	XL Triangle AdvanteX SUV TR259	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
65	XL Nexen WinGuard Sport 2 WU7 SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
66	XL Pirelli Scorpion DOT 2023 FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
67	Observe GSi5 FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
68	TERRAMAX A/T OWL	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
69	Terramax M/T P.O.R.	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
70	XL Michelin Pilot Alpin 5 SUV FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
71	Alpin 6 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
72	XL Michelin Pilot Sport 4 ZP FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
73	Eskimo ICE	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
74	Snowproof 2 FR	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
75	XL Hankook Ventus S1 Evo2 K117B ROF FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
76	XL Nexen WinGuard Sport 2 WU7	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
77	Z-507 Zuper Snow	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
78	NFera RU1 SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
79	Transway 2	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
80	CARGO SPEED WINTER пш	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
81	XL Triangle SnowLink Trin PL01 FR	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
82	X-Ice XI3 ZP	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
83	Latitude Tour HP N0	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
84	Cobra Radial GT RWL	\N	7	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
85	Cinturato P7 RUN FLAT MOE FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
86	XL VREDESTEIN ULTRAC SATIN FR	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
87	Powergy FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
88	XL Goodyear UltraGrip ARCTIC 2 SUV пш	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
89	XL Kormoran SNOW SUV FR	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
90	SnowLink Trin LL01	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
91	NFera Primus	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
92	XL Pirelli PZero PZ4 * FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
93	XL Sailun Atrezzo 4 Seasons FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
94	TERRAMAX M/T	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
95	Competus A/T2	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
96	WINTER 1	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
97	NBlue S	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
98	NFera RU1 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
99	XL Triangle SnowLink Trin PL01	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
100	Latitude Tour HP DEMO	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
101	Winter 1	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
102	ULTRAC FR	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
103	Ice Blazer Arctic FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
104	XL Sailun Ice Blazer Alpine EVO 1	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
105	SnowLink Trin PL02	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
106	XL Michelin E Primacy * MO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
107	XL Nexen WinGuard Sport 2 WU7 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
108	XL Nexen NFera SU1 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
109	Z-507 Zuper Snow FR	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
110	XL Hankook Kinergy Eco2 K435	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
111	XL VREDESTEIN ULTRAC	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
112	Ventus Prime4 K135 FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
113	XL Nokian Snowproof 2 SUV	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
114	Hakkapeliitta LT3 шип	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
115	XL Sailun Atrezzo ZSR ROF FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
116	XL Nokian Hakkapeliitta R5 FR	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
117	WinGuard ICE SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
118	XL Matador MP-82 Cоnquerra 2 FR	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
119	S FIT EQ+ LK01	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
120	TERRAMAX A/T	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
121	XL Goodyear UltraGrip Performance SUV G1 Б/У 5 мм	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
122	XL Michelin Pilot Sport 5 ACOUSTIC FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
123	All Season Light Truck	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
124	Transalp 2+	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
125	XL Aplus A610 FR	\N	1	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
126	XL Michelin Pilot Alpin 5 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
127	XL Continental PremiumContact 6 SSR FR	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
128	XL Michelin X-Ice North 4 SUV шип FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
129	WinGuard Sport 2 WU7 SUV FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
130	XL Roadstone NFera SU1 FR	\N	28	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
131	WINTER FR	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
132	Extmile SL87N	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
133	XL Toyo Proxes Comfort FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
134	XL Triangle SnowLink Trin PL02 FR	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
135	ATHENA SP-302 A/T	\N	3	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
136	X FIT Van LV01	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
137	CONQUEWIND R/T OWL P.O.R. FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
138	XL Nexen Winguard Ice Plus WH43	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
139	SnowLink DW701	\N	16	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
140	NFera SU1	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
141	PREDATOR M/T RWL P.O.R. FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
142	XL Sailun Atrezzo ZSR 2 FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
143	XL Michelin Pilot Sport 4 S N0 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
144	Roadian 542	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
145	XL Hankook Ventus S1 evo3 SUV K127C ROF * FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
146	XL Hankook Dynapro HP2+ RA33D AO	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
147	UltraGrip ICE ARCTIC шип	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
148	XL Pirelli Powergy	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
149	Snowproof 2 SUV	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
150	Atrezzo Eco	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
151	L-MAX9	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
152	Open Country A/T Plus	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
153	EAGLE F1 ASYMMETRIC 5	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
154	XL VREDESTEIN ULTRAC PRO FR	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
155	XL Michelin Pilot Alpin 5 NA2 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
156	XL Nokian Hakkapeliitta R5 SUV FR	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
157	XL Michelin Pilot Sport 3 T0 ACOUSTIC FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
158	Atrezzo Elite	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
159	Ultra High Performance FR	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
160	NBlue Premium	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
161	XL Kleber Krisalp HP3 FR	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
162	XL Michelin Alpin 5 NA2 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
163	XL TIGAR WINTER	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
164	XL Michelin Pilot Alpin 4 MO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
165	ContiEcoContact 5 DEMO FR	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
166	XL Laufenn I FIT+ LW31 FR	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
167	CargoSpeed Evo	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
168	WinGuard Ice Plus WH43	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
169	XL Hankook Ventus S1 evo3 EV K127E AO FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
170	XL Triangle SnowLink Trin PL02	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
171	XL Sava Eskimo ICE	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
172	Classe Premiere CP672	\N	28	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
173	XL Toyo Proxes ST III FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
174	Terramax M/T OWL FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
175	XL Pirelli Winter Sottozero 2 FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
176	XL Kormoran Ultra High Performance FR	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
177	S FIT EQ LK01 FR	\N	24	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
178	XL Kormoran SNOW	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
179	Vantra LT RA18	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
180	XL Goodyear UltraGrip ARCTIC 2 SUV шип	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
181	E Primacy	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
182	Terramax A/T	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
183	Ice Blazer Arctic	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
184	Roadian HTX RH5	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
185	Winter I*Cept iZ2 W616 FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
186	XL Michelin Pilot Alpin 5 SUV NE0 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
187	XL Michelin Pilot Sport 5 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
188	XL Michelin Pilot Sport 4 * FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
189	X-Ice Snow SUV FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
190	XL Sava Intensa UHP 2 FR	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
191	Krisalp HP3	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
192	ROADHAWK	\N	10	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
193	Winter	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
194	XL Nokian WR Snowproof P FR	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
195	XL Nexen Winguard Ice Plus WH43 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
196	L-STRONG 36	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
197	ALL WEATHER	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
198	XL Goodyear UltraGrip ARCTIC 2 SUV шип FR	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
199	XL Pirelli PZero PZ4 LR PNCS FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
200	NBlue HD Plus	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
201	PREDATOR M/T	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
202	XL Michelin Primacy 5	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
203	XL Michelin Pilot Sport EV NE0 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
204	Winter I*Cept iZ3 X W636A	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
205	XL Nexen WinGuard ICE SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
206	ROADHAWK 2	\N	10	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
207	XL Goodyear UltraGrip ICE 3	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
208	ICEWAYS 2 пш FR	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
209	XL Pirelli Scorpion Verde	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
210	XL Michelin Latitude Sport 3 ZP FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
211	WinGuard WinSpike 3 пш FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
212	Classe Premiere CP671	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
213	XL Nexen WinGuard WinSpike 3 пш	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
214	XL Fulda EcoControl SUV FR	\N	17	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
215	Hakkapeliitta R5 SUV	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
216	NFera SU1 FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
217	DURAMAX STEEL	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
218	Primacy 3 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
219	XL Goodyear UltraGrip ICE ARCTIC шип FR	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
220	XL Nexen NFera RU5 SUV FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
221	XL Michelin Primacy 4 * FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
222	Vector 4 Seasons G3	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
223	XL Nokian Hakkapeliitta R5 SUV	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
224	WinGuard Sport 2 WU7 SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
225	XL TIGAR WINTER SUV	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
226	Transway	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
227	XL Sailun Atrezzo 4 Seasons PRO	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
228	XL GRENLANDER L-ZEAL 56 FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
229	Atrezzo ZSR SUV FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
230	Winguard WT1	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
231	XL Pirelli PZero J LR FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
232	DRAK M/T P.O.R. FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
233	XL Goodyear UltraGrip ARCTIC 2 шип	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
234	Hakkapeliitta LT3 пш	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
235	XL TIGAR WINTER FR	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
236	XL Bridgestone Turanza 6 FR	\N	5	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
237	COMPETUS A/T3 FR	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
238	Primemaster M/T I P.O.R.	\N	27	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
239	Revola	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
240	Ventus S1 evo3 EV K127E FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
241	XL Dunlop SP Winter Sport 4D * FR	\N	8	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
242	XL GRENLANDER MAGA A/T TWO FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
243	XL Goodyear UltraGrip ICE ARCTIC шип	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
244	Pilot Sport 4 SUV FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
245	XL Goodyear Wrangler DURATRAC LR FR	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
246	XL VREDESTEIN ULTRAC VORTI+ FR	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
247	WinGuard Sport 2 WU7	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
248	VanPro Winter пш	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
249	XL Michelin Pilot Sport 4 SUV DOT 2023 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
250	XL Michelin Latitude Tour HP JLR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
251	XL Kormoran STUD SUV пш	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
252	WinGuard ICE	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
253	XL Hankook Ventus S1 evo3 EV K127E NE0 FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
254	Scorpion Verde MO FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
255	XL TIGAR Winter SUV	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
256	XL Lassa Revola	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
257	XL Toyo Proxes ST III	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
258	Greenways	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
259	XL Sailun Atrezzo ZSR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
260	Scorpion AO (+) SEAL INSIDE ELECT FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
261	Transway 3	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
262	XL Continental WinterContact TS 860 S FR	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
263	Snowproof 2	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
264	MAGA A/T TWO RWL FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
265	XL Nokian Hakkapeliitta R5	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
266	XL Hankook Ventus S1 evo3 K127 *	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
267	L-GRIP16	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
268	XL Sailun Ice Blazer Alpine+	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
269	XL Lassa COMPETUS A/T3 FR	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
270	Alnac 4G	\N	2	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
271	Hectorra 5	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
272	UltraGrip ICE 2	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
273	Hectorra 5 FR	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
274	XL Pirelli PZero N1 FR	\N	14	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
275	Roadian HTX RH5 SUV OWL	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
276	Proxes Comfort	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
277	XL Sava Eskimo HP 2 FR	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
278	Roadian HTX RH5 OWL	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
279	XL Sailun Atrezzo ZSR FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
280	XL Michelin Primacy 4 MO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
281	XL Hankook Winter I*Cept iZ2 W616 FR	\N	12	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
282	ULTRAC	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
283	COLO H02	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
284	XL Continental WinterContact TS 870 P FR	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
285	SnowLion TR777	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
286	XL Sailun Atrezzo ZSR SUV	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
287	Atrezzo Elite FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
288	MAGA A/T ONE	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
289	Terramax A/T OWL	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
290	N5000 Plus FR	\N	28	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
291	SW612	\N	35	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
292	XL Michelin Pilot Sport 3 MO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
293	Commercio PRO	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
294	COMPETUS A/T3	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
295	XL Nokian Snowproof 2 SUV FR	\N	15	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
296	L-ZEAL 56 FR	\N	18	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
297	XL Continental WinterContact TS 870 P	\N	6	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
298	XL Kleber Krisalp HP3 SUV	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
299	XL Lassa Competus A/T3 FR	\N	23	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
300	TE301	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
301	XL VREDESTEIN ULTRAC FR	\N	34	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
302	Transpro	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
303	XL Sailun Ice Blazer Arctic ROF FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
304	Ice Blazer Alpine+	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
305	XL Michelin Pilot Sport 3 AO FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
306	NFera RU1 SUV FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
307	A869	\N	1	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
308	Hectorra Van	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
309	WINTER SUV	\N	31	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
310	XL Matador MP-93 Nordicca FR	\N	25	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
311	XL Firestone WINTERHAWK 4 FR	\N	10	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
312	XL Goodyear UltraGrip ICE ARCTIC пш	\N	11	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
313	Terramax M/T OWL P.O.R. FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
314	Proxes ST III FR	\N	32	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
315	XL Michelin Pilot Super Sport * FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
316	Road Performance	\N	22	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
317	Transpro 2	\N	21	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
318	Eskimo HP 2	\N	30	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
319	XL Kapsen SnowShoes AW33 DEMO	\N	19	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
320	Roadian HTX RH5 OWL FR	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
321	WinGuard Ice SUV	\N	26	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
322	XL Kingrun Phantom K3000 FR	\N	20	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
323	Mud-Terrain T/A KM3 RWL P.O.R. FR	\N	4	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
324	XL Michelin Pilot Sport 3 MO ACOUSTIC DOT 2022 FR	\N	13	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
325	XL Sailun Ice Blazer Alpine EVO 1 FR	\N	29	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
326	XL Triangle EffeXSport TH202 FR	\N	33	2025-02-21 15:45:42.245	2025-02-21 15:45:42.245
\.


--
-- Data for Name: tyres; Type: TABLE DATA; Schema: public; Owner: shshopuser
--

COPY public.tyres (id, title, description, country, date_code, applicability, sku, inventory_quantity, price, load_speed_index, brand, model, width, profile, constr, diameter, delimiter, load_index, speed_index, type, brand_id, model_id) FROM stdin;
258	155/65R13 73Q Sava Eskimo S3+ 	Шина Sava 155/65R13 73Q Sava Eskimo S3+  розмір 155/65R13. Виробник: Польща	Польща	4923	Passenger	SM000003838	12	1675.00	73Q	Sava	Eskimo S3+	155.0	65.0	R	13.0	/	73	Q	\N	30	21
259	155/70R13 75T Laufenn I FIT+ LW31 	Шина Laufenn 155/70R13 75T Laufenn I FIT+ LW31  розмір 155/70R13. Виробник: Угорщина	Угорщина	2323	Passenger	SM000015159	2	1680.00	75T	Laufenn	I FIT+ LW31	155.0	70.0	R	13.0	/	75	T	\N	24	49
260	155/70R13 75T TIGAR Winter 1 	Шина TIGAR 155/70R13 75T TIGAR Winter 1  розмір 155/70R13. Виробник: Сербія	Сербія	2824	Passenger	SM000006380	4	1717.00	75T	TIGAR	Winter 1	155.0	70.0	R	13.0	/	75	T	\N	31	101
261	165/65R14 79T Sailun Ice Blazer Alpine+ 	Шина Sailun 165/65R14 79T Sailun Ice Blazer Alpine+  розмір 165/65R14. Виробник: Китай	Китай	2824	Passenger	SM000010658	4	1735.00	79T	Sailun	Ice Blazer Alpine+	165.0	65.0	R	14.0	/	79	T	\N	29	304
262	165/70R14 81T Sailun Ice Blazer Alpine+ 	Шина Sailun 165/70R14 81T Sailun Ice Blazer Alpine+  розмір 165/70R14. Виробник: Китай	Китай	2524	Passenger	SM000008791	4	1680.00	81T	Sailun	Ice Blazer Alpine+	165.0	70.0	R	14.0	/	81	T	\N	29	304
263	165/70R14 81T Sava Eskimo S3+ 	Шина Sava 165/70R14 81T Sava Eskimo S3+  розмір 165/70R14. Виробник: Польща	Польща	2723	Passenger	SM000003840	1	1838.00	81T	Sava	Eskimo S3+	165.0	70.0	R	14.0	/	81	T	\N	30	21
264	175/70R14 84T WESTLAKE SW608 Snowmaster 	Шина WESTLAKE 175/70R14 84T WESTLAKE SW608 Snowmaster  розмір 175/70R14. Виробник: Китай	Китай	2024	Passenger	SM000017051	2	1612.00	84T	WESTLAKE	SW608 Snowmaster	175.0	70.0	R	14.0	/	84	T	\N	35	33
265	175/70R14 84T XL Nexen WinGuard WinSpike 3 пш 	Шина Nexen 175/70R14 84T XL Nexen WinGuard WinSpike 3 пш  розмір 175/70R14. Виробник: Корея	Корея	1924	Passenger	SM000003700	4	2300.00	84T	Nexen	XL Nexen WinGuard WinSpike 3 пш	175.0	70.0	R	14.0	/	84	T	\N	26	213
266	175/70R14 88T XL Goodyear UltraGrip ICE ARCTIC пш 	Шина Goodyear 175/70R14 88T XL Goodyear UltraGrip ICE ARCTIC пш  розмір 175/70R14. Виробник: Польща	Польща	923 	Passenger	SM000011916	4	2940.00	88T	Goodyear	XL Goodyear UltraGrip ICE ARCTIC пш	175.0	70.0	R	14.0	/	88	T	\N	11	312
267	175/70R14 88T XL Goodyear UltraGrip ICE ARCTIC шип 	Шина Goodyear 175/70R14 88T XL Goodyear UltraGrip ICE ARCTIC шип  розмір 175/70R14. Виробник: Польща	Польща	923 	Passenger	SM000002081	12	2783.00	88T	Goodyear	XL Goodyear UltraGrip ICE ARCTIC шип	175.0	70.0	R	14.0	/	88	T	\N	11	243
268	175/70R14 88T XL Nexen Winguard Ice Plus WH43 	Шина Nexen 175/70R14 88T XL Nexen Winguard Ice Plus WH43  розмір 175/70R14. Виробник: Корея	Корея	2224	Passenger	SM000017484	4	2357.00	88T	Nexen	XL Nexen Winguard Ice Plus WH43	175.0	70.0	R	14.0	/	88	T	\N	26	138
269	175/70R14 88T XL Sava Eskimo ICE 	Шина Sava 175/70R14 88T XL Sava Eskimo ICE  розмір 175/70R14. Виробник: Польща	Польща	2923	Passenger	SM000003863	12	2231.00	88T	Sava	XL Sava Eskimo ICE	175.0	70.0	R	14.0	/	88	T	\N	30	171
270	185/60R14 82T Sailun Ice Blazer Alpine+ 	Шина Sailun 185/60R14 82T Sailun Ice Blazer Alpine+  розмір 185/60R14. Виробник: Китай	Китай	2124	Passenger	SM000012118	4	1866.00	82T	Sailun	Ice Blazer Alpine+	185.0	60.0	R	14.0	/	82	T	\N	29	304
271	185/60R14 82T TIGAR WINTER 1 	Шина TIGAR 185/60R14 82T TIGAR WINTER 1  розмір 185/60R14. Виробник: Сербія	Сербія	3224	Passenger	SM000006389	4	2153.00	82T	TIGAR	WINTER 1	185.0	60.0	R	14.0	/	82	T	\N	31	96
272	185/65R14 86T Sailun Ice Blazer Arctic 	Шина Sailun 185/65R14 86T Sailun Ice Blazer Arctic  розмір 185/65R14. Виробник: Китай	Китай	2624	Passenger	SM000008737	12	1890.00	86T	Sailun	Ice Blazer Arctic	185.0	65.0	R	14.0	/	86	T	\N	29	183
273	185/70R14 92R XL Triangle SnowLink Trin PL01 	Шина Triangle 185/70R14 92R XL Triangle SnowLink Trin PL01  розмір 185/70R14. Виробник: Китай	Китай	1824	Passenger	SM000012296	4	1889.00	92R	Triangle	XL Triangle SnowLink Trin PL01	185.0	70.0	R	14.0	/	92	R	\N	33	99
274	185/70R14 92T XL Nexen Winguard Ice Plus WH43 	Шина Nexen 185/70R14 92T XL Nexen Winguard Ice Plus WH43  розмір 185/70R14. Виробник: Корея	Корея	2524	Passenger	SM000003693	4	2345.00	92T	Nexen	XL Nexen Winguard Ice Plus WH43	185.0	70.0	R	14.0	/	92	T	\N	26	138
275	195/70R14 91T Nexen WinGuard Ice Plus WH43 	Шина Nexen 195/70R14 91T Nexen WinGuard Ice Plus WH43  розмір 195/70R14. Виробник: Корея	Корея	2424	Passenger	SM000008528	8	2825.00	91T	Nexen	WinGuard Ice Plus WH43	195.0	70.0	R	14.0	/	91	T	\N	26	168
276	185/60R15 88T XL Nexen WinGuard WinSpike 3 пш 	Шина Nexen 185/60R15 88T XL Nexen WinGuard WinSpike 3 пш  розмір 185/60R15. Виробник: Корея	Корея	2223	Passenger	SM000017780	4	1969.00	88T	Nexen	XL Nexen WinGuard WinSpike 3 пш	185.0	60.0	R	15.0	/	88	T	\N	26	213
277	185/65R15 88H WESTLAKE SW608 Snowmaster 	Шина WESTLAKE 185/65R15 88H WESTLAKE SW608 Snowmaster  розмір 185/65R15. Виробник: Китай	Китай	2824	Passenger	SM000017420	12	1733.00	88H	WESTLAKE	SW608 Snowmaster	185.0	65.0	R	15.0	/	88	H	\N	35	33
278	185/65R15 88T Pirelli Cinturato Winter KS 	Шина Pirelli 185/65R15 88T Pirelli Cinturato Winter KS  розмір 185/65R15. Виробник: Румунія	Румунія	3723	Passenger	SM000015209	6	2441.00	88T	Pirelli	Cinturato Winter KS	185.0	65.0	R	15.0	/	88	T	\N	14	61
279	185/65R15 88T Sava Eskimo S3+ 	Шина Sava 185/65R15 88T Sava Eskimo S3+  розмір 185/65R15. Виробник: Польща	Польща	2924	Passenger	SM000003875	12	2305.00	88T	Sava	Eskimo S3+	185.0	65.0	R	15.0	/	88	T	\N	30	21
280	185/65R15 88T WESTLAKE SW618 	Шина WESTLAKE 185/65R15 88T WESTLAKE SW618  розмір 185/65R15. Виробник: Китай	Китай	2824	Passenger	SM000017412	6	1764.00	88T	WESTLAKE	SW618	185.0	65.0	R	15.0	/	88	T	\N	35	48
281	185/65R15 92T XL Kormoran SNOW 	Шина Kormoran 185/65R15 92T XL Kormoran SNOW  розмір 185/65R15. Виробник: Сербія	Сербія	4023	Passenger	SM000010833	2	2095.00	92T	Kormoran	XL Kormoran SNOW	185.0	65.0	R	15.0	/	92	T	\N	22	178
282	185/65R15 92T XL Nexen WinGuard ice 3 	Шина Nexen 185/65R15 92T XL Nexen WinGuard ice 3  розмір 185/65R15. Виробник: Корея	Корея	2424	Passenger	SM000005682	4	2289.00	92T	Nexen	XL Nexen WinGuard ice 3	185.0	65.0	R	15.0	/	92	T	\N	26	4
283	185/65R15 92T XL TIGAR WINTER 	Шина TIGAR 185/65R15 92T XL TIGAR WINTER  розмір 185/65R15. Виробник: Сербія	Сербія	4624	Passenger	SM000006394	6	2231.00	92T	TIGAR	XL TIGAR WINTER	185.0	65.0	R	15.0	/	92	T	\N	31	163
284	195/50R15 82H Sailun Ice Blazer Alpine+ FR	Шина Sailun 195/50R15 82H Sailun Ice Blazer Alpine+ FR розмір 195/50R15. Виробник: Китай	Китай	2822	Passenger	SM000009438	2	1890.00	82H	Sailun	Ice Blazer Alpine+ FR	195.0	50.0	R	15.0	/	82	H	\N	29	63
285	195/50R15 82H TIGAR WINTER FR	Шина TIGAR 195/50R15 82H TIGAR WINTER FR розмір 195/50R15. Виробник: Сербія	Сербія	3223	Passenger	SM000006396	8	2258.00	82H	TIGAR	WINTER FR	195.0	50.0	R	15.0	/	82	H	\N	31	131
286	195/55R15 85H Sailun Ice Blazer Arctic FR	Шина Sailun 195/55R15 85H Sailun Ice Blazer Arctic FR розмір 195/55R15. Виробник: Китай	Китай	2124	Passenger	SM000008664	4	2132.00	85H	Sailun	Ice Blazer Arctic FR	195.0	55.0	R	15.0	/	85	H	\N	29	103
287	195/55R15 85H Sava Eskimo HP 2 	Шина Sava 195/55R15 85H Sava Eskimo HP 2  розмір 195/55R15. Виробник: Польща	Польща	2824	Passenger	SM000014722	8	2830.00	85H	Sava	Eskimo HP 2	195.0	55.0	R	15.0	/	85	H	\N	30	318
288	195/55R15 85T Goodyear UltraGrip ICE 2 	Шина Goodyear 195/55R15 85T Goodyear UltraGrip ICE 2  розмір 195/55R15. Виробник: Польща	Польща	2023	Passenger	SM000002114	1	3276.00	85T	Goodyear	UltraGrip ICE 2	195.0	55.0	R	15.0	/	85	T	\N	11	272
289	195/55R15 85T Goodyear UltraGrip ICE ARCTIC шип 	Шина Goodyear 195/55R15 85T Goodyear UltraGrip ICE ARCTIC шип  розмір 195/55R15. Виробник: Польща	Польща	4022	Passenger	SM000002120	2	3413.00	85T	Goodyear	UltraGrip ICE ARCTIC шип	195.0	55.0	R	15.0	/	85	T	\N	11	147
290	195/60R15 88H Sailun Ice Blazer Alpine+ 	Шина Sailun 195/60R15 88H Sailun Ice Blazer Alpine+  розмір 195/60R15. Виробник: Китай	Китай	2724	Passenger	SM000015568	4	2079.00	88H	Sailun	Ice Blazer Alpine+	195.0	60.0	R	15.0	/	88	H	\N	29	304
291	195/60R15 88T Sava Eskimo ICE 	Шина Sava 195/60R15 88T Sava Eskimo ICE  розмір 195/60R15. Виробник: Польща	Польща	4123	Passenger	SM000003890	4	2504.00	88T	Sava	Eskimo ICE	195.0	60.0	R	15.0	/	88	T	\N	30	73
292	195/60R15 88T Sava Eskimo S3+ 	Шина Sava 195/60R15 88T Sava Eskimo S3+  розмір 195/60R15. Виробник: Польща	Польща	3424	Passenger	SM000003889	10	2468.00	88T	Sava	Eskimo S3+	195.0	60.0	R	15.0	/	88	T	\N	30	21
293	195/60R15 88T TIGAR Winter 	Шина TIGAR 195/60R15 88T TIGAR Winter  розмір 195/60R15. Виробник: Сербія	Сербія	3524	Passenger	SM000006399	2	2426.00	88T	TIGAR	Winter	195.0	60.0	R	15.0	/	88	T	\N	31	193
294	195/60R15 88T Triangle SnowLion TR777 	Шина Triangle 195/60R15 88T Triangle SnowLion TR777  розмір 195/60R15. Виробник: Китай	Китай	2124	Passenger	SM000015033	4	2179.00	88T	Triangle	SnowLion TR777	195.0	60.0	R	15.0	/	88	T	\N	33	285
295	195/65R15 91H Nexen WinGuard Sport 2 WU7 	Шина Nexen 195/65R15 91H Nexen WinGuard Sport 2 WU7  розмір 195/65R15. Виробник: Корея	Корея	2124	Passenger	SM000017557	12	2363.00	91H	Nexen	WinGuard Sport 2 WU7	195.0	65.0	R	15.0	/	91	H	\N	26	247
296	195/65R15 91H WESTLAKE SW608 Snowmaster 	Шина WESTLAKE 195/65R15 91H WESTLAKE SW608 Snowmaster  розмір 195/65R15. Виробник: Китай	Китай	2224	Passenger	SM000017054	12	1869.00	91H	WESTLAKE	SW608 Snowmaster	195.0	65.0	R	15.0	/	91	H	\N	35	33
297	205/65R15 94H Kleber Krisalp HP3 	Шина Kleber 205/65R15 94H Kleber Krisalp HP3  розмір 205/65R15. Виробник: Румунія	Румунія	1724	Passenger	SM000001611	2	3796.00	94H	Kleber	Krisalp HP3	205.0	65.0	R	15.0	/	94	H	\N	21	191
298	215/65R15 96H Sailun Ice Blazer Alpine+ 	Шина Sailun 215/65R15 96H Sailun Ice Blazer Alpine+  розмір 215/65R15. Виробник: Китай	Китай	2024	Passenger	SM000017544	4	2966.00	96H	Sailun	Ice Blazer Alpine+	215.0	65.0	R	15.0	/	96	H	\N	29	304
299	195/55R16 87Q Toyo Observe GSi5 Б/У FR	Шина Toyo 195/55R16 87Q Toyo Observe GSi5 Б/У FR розмір 195/55R16. Виробник: Японія	Японія	2217	Passenger	SM000004082	3	1964.00	87Q	Toyo	Observe GSi5 Б/У FR	195.0	55.0	R	16.0	/	87	Q	\N	32	31
300	195/60R16 89H Nexen WinGuard SnowG WH2 	Шина Nexen 195/60R16 89H Nexen WinGuard SnowG WH2  розмір 195/60R16. Виробник: Корея	Корея	1923	Passenger	SM000003482	8	2567.00	89H	Nexen	WinGuard SnowG WH2	195.0	60.0	R	16.0	/	89	H	\N	26	44
301	205/55R16 91H Kleber Krisalp HP3 	Шина Kleber 205/55R16 91H Kleber Krisalp HP3  розмір 205/55R16. Виробник: Польща	Польща	4423	Passenger	SM000001597	12	3145.00	91H	Kleber	Krisalp HP3	205.0	55.0	R	16.0	/	91	H	\N	21	191
302	205/55R16 91H Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 205/55R16 91H Nexen WinGuard Sport 2 WU7 FR розмір 205/55R16. Виробник: Корея	Корея	1924	Passenger	SM000015465	7	2699.00	91H	Nexen	WinGuard Sport 2 WU7 FR	205.0	55.0	R	16.0	/	91	H	\N	26	43
303	205/55R16 91T Lassa ICEWAYS 2 пш FR	Шина Lassa 205/55R16 91T Lassa ICEWAYS 2 пш FR розмір 205/55R16. Виробник: Туреччина	Туреччина	4224	Passenger	SM000005403	2	2575.00	91T	Lassa	ICEWAYS 2 пш FR	205.0	55.0	R	16.0	/	91	T	\N	23	208
304	205/55R16 91T Nokian Snowproof 2 	Шина Nokian 205/55R16 91T Nokian Snowproof 2  розмір 205/55R16. Виробник: Фінляндія	Фінляндія	2824	Passenger	SM000015923	12	3490.00	91T	Nokian	Snowproof 2	205.0	55.0	R	16.0	/	91	T	\N	15	263
305	205/55R16 91T Sava Eskimo S3+ 	Шина Sava 205/55R16 91T Sava Eskimo S3+  розмір 205/55R16. Виробник: Туреччина	Туреччина	3024	Passenger	SM000003864	2	2678.00	91T	Sava	Eskimo S3+	205.0	55.0	R	16.0	/	91	T	\N	30	21
306	205/55R16 91V WESTLAKE Z-507 Zuper Snow FR	Шина WESTLAKE 205/55R16 91V WESTLAKE Z-507 Zuper Snow FR розмір 205/55R16. Виробник: Китай	Китай	2324	Passenger	SM000017061	12	1995.00	91V	WESTLAKE	Z-507 Zuper Snow FR	205.0	55.0	R	16.0	/	91	V	\N	35	109
307	205/55R16 94H XL TIGAR WINTER FR	Шина TIGAR 205/55R16 94H XL TIGAR WINTER FR розмір 205/55R16. Виробник: Сербія	Сербія	4624	Passenger	SM000006405	4	2457.00	94H	TIGAR	XL TIGAR WINTER FR	205.0	55.0	R	16.0	/	94	H	\N	31	235
308	205/60R16 92H Kleber Krisalp HP3 	Шина Kleber 205/60R16 92H Kleber Krisalp HP3  розмір 205/60R16. Виробник: Польща	Польща	2924	Passenger	SM000002601	12	3491.00	92H	Kleber	Krisalp HP3	205.0	60.0	R	16.0	/	92	H	\N	21	191
309	205/60R16 92H WESTLAKE Z-507 Zuper Snow 	Шина WESTLAKE 205/60R16 92H WESTLAKE Z-507 Zuper Snow  розмір 205/60R16. Виробник: Китай	Китай	2124	Passenger	SM000017062	1	2205.00	92H	WESTLAKE	Z-507 Zuper Snow	205.0	60.0	R	16.0	/	92	H	\N	35	77
310	205/60R16 92T Michelin Alpin 6 FR	Шина Michelin 205/60R16 92T Michelin Alpin 6 FR розмір 205/60R16. Виробник: Польща	Польща	2123	Passenger	SM000003293	0	4232.00	92T	Michelin	Alpin 6 FR	205.0	60.0	R	16.0	/	92	T	\N	13	71
767	195/70R15C 104/102R Kleber Transalp 2+ 	Шина Kleber 195/70R15C 104/102R Kleber Transalp 2+  розмір 195/70R15C. Виробник: Румунія	Румунія	3124	Van	SM000017386	10	3843.00	104/102R	Kleber	Transalp 2+	195.0	70.0	R	15.0	/	\N	C	\N	21	124
311	205/60R16 96H XL Matador MP-93 Nordicca 	Шина Matador 205/60R16 96H XL Matador MP-93 Nordicca  розмір 205/60R16. Виробник: Словаччина	Словаччина	4424	Passenger	SM000011183	4	2956.00	96H	Matador	XL Matador MP-93 Nordicca	205.0	60.0	R	16.0	/	96	H	\N	25	60
312	205/60R16 96H XL TIGAR WINTER 	Шина TIGAR 205/60R16 96H XL TIGAR WINTER  розмір 205/60R16. Виробник: Сербія	Сербія	3724	Passenger	SM000006408	12	2951.00	96H	TIGAR	XL TIGAR WINTER	205.0	60.0	R	16.0	/	96	H	\N	31	163
313	205/65R16 95H Nokian Snowproof 2 	Шина Nokian 205/65R16 95H Nokian Snowproof 2  розмір 205/65R16. Виробник: Фінляндія	Фінляндія	2023	Passenger	SM000015925	2	3969.00	95H	Nokian	Snowproof 2	205.0	65.0	R	16.0	/	95	H	\N	15	263
314	205/65R16 95Q Nexen WinGuard ICE 	Шина Nexen 205/65R16 95Q Nexen WinGuard ICE  розмір 205/65R16. Виробник: Корея	Корея	2324	Passenger	SM000003614	12	2651.00	95Q	Nexen	WinGuard ICE	205.0	65.0	R	16.0	/	95	Q	\N	26	252
315	205/65R16 99T XL TIGAR ICE пш 	Шина TIGAR 205/65R16 99T XL TIGAR ICE пш  розмір 205/65R16. Виробник: Сербія	Сербія	2724	Passenger	SM000011807	4	3071.00	99T	TIGAR	XL TIGAR ICE пш	205.0	65.0	R	16.0	/	99	T	\N	31	3
316	215/55R16 97H XL Sailun Ice Blazer Alpine EVO 1 FR	Шина Sailun 215/55R16 97H XL Sailun Ice Blazer Alpine EVO 1 FR розмір 215/55R16. Виробник: Китай	Китай	1524	Passenger	SM000010664	4	2683.00	97H	Sailun	XL Sailun Ice Blazer Alpine EVO 1 FR	215.0	55.0	R	16.0	/	97	H	\N	29	325
317	215/55R16 97H XL TIGAR WINTER FR	Шина TIGAR 215/55R16 97H XL TIGAR WINTER FR розмір 215/55R16. Виробник: Сербія	Сербія	2624	Passenger	SM000006412	6	2914.00	97H	TIGAR	XL TIGAR WINTER FR	215.0	55.0	R	16.0	/	97	H	\N	31	235
318	215/55R16 97R XL Triangle SnowLink Trin PL01 	Шина Triangle 215/55R16 97R XL Triangle SnowLink Trin PL01  розмір 215/55R16. Виробник: Китай	Китай	4024	Passenger	SM000012382	4	2623.00	97R	Triangle	XL Triangle SnowLink Trin PL01	215.0	55.0	R	16.0	/	97	R	\N	33	99
319	215/60R16 95H Kleber Krisalp HP3 	Шина Kleber 215/60R16 95H Kleber Krisalp HP3  розмір 215/60R16. Виробник: Польща	Польща	4023	Passenger	SM000017388	8	4174.00	95H	Kleber	Krisalp HP3	215.0	60.0	R	16.0	/	95	H	\N	21	191
320	215/60R16 99H XL Matador MP-93 Nordicca 	Шина Matador 215/60R16 99H XL Matador MP-93 Nordicca  розмір 215/60R16. Виробник: Португалія	Португалія	3924	Passenger	SM000002804	4	3302.00	99H	Matador	XL Matador MP-93 Nordicca	215.0	60.0	R	16.0	/	99	H	\N	25	60
321	215/60R16 99H XL Sailun Ice Blazer Alpine+ 	Шина Sailun 215/60R16 99H XL Sailun Ice Blazer Alpine+  розмір 215/60R16. Виробник: Китай	Китай	2024	Passenger	SM000017602	2	2876.00	99H	Sailun	XL Sailun Ice Blazer Alpine+	215.0	60.0	R	16.0	/	99	H	\N	29	268
322	215/60R16 99H XL WESTLAKE Z-507 Zuper Snow 	Шина WESTLAKE 215/60R16 99H XL WESTLAKE Z-507 Zuper Snow  розмір 215/60R16. Виробник: Китай	Китай	3024	Passenger	SM000017063	12	2373.00	99H	WESTLAKE	XL WESTLAKE Z-507 Zuper Snow	215.0	60.0	R	16.0	/	99	H	\N	35	50
323	215/65R16 102T XL Nexen WinGuard WinSpike 3 пш 	Шина Nexen 215/65R16 102T XL Nexen WinGuard WinSpike 3 пш  розмір 215/65R16. Виробник: Корея	Корея	1824	Passenger	SM000017596	12	3633.00	102T	Nexen	XL Nexen WinGuard WinSpike 3 пш	215.0	65.0	R	16.0	/	102	T	\N	26	213
324	225/55R16 99T XL Nexen WinGuard Ice Plus WH43 	Шина Nexen 225/55R16 99T XL Nexen WinGuard Ice Plus WH43  розмір 225/55R16. Виробник: Корея	Корея	2524	Passenger	SM000017589	6	3917.00	99T	Nexen	XL Nexen WinGuard Ice Plus WH43	225.0	55.0	R	16.0	/	99	T	\N	26	45
325	225/60R16 102V XL Nexen WinGuard Sport 2 WU7 	Шина Nexen 225/60R16 102V XL Nexen WinGuard Sport 2 WU7  розмір 225/60R16. Виробник: Корея	Корея	2623	Passenger	SM000014763	2	3423.00	102V	Nexen	XL Nexen WinGuard Sport 2 WU7	225.0	60.0	R	16.0	/	102	V	\N	26	76
326	205/45R17 88V XL Dunlop SP Winter Sport 4D * FR	Шина Dunlop 205/45R17 88V XL Dunlop SP Winter Sport 4D * FR розмір 205/45R17. Виробник: Німеччина	Німеччина	4022	Passenger	SM000001435	1	8295.00	88V	Dunlop	XL Dunlop SP Winter Sport 4D * FR	205.0	45.0	R	17.0	/	88	V	\N	8	241
327	205/50R17 93T XL Goodyear UltraGrip ARCTIC 2 шип 	Шина Goodyear 205/50R17 93T XL Goodyear UltraGrip ARCTIC 2 шип  розмір 205/50R17. Виробник: Польща	Польща	2423	Passenger	SM000002152	8	4358.00	93T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 шип	205.0	50.0	R	17.0	/	93	T	\N	11	233
328	205/50R17 93T XL Nexen Winguard Ice Plus WH43 	Шина Nexen 205/50R17 93T XL Nexen Winguard Ice Plus WH43  розмір 205/50R17. Виробник: Корея	Корея	2323	Passenger	SM000010714	6	3686.00	93T	Nexen	XL Nexen Winguard Ice Plus WH43	205.0	50.0	R	17.0	/	93	T	\N	26	138
329	205/50R17 93V XL Sava Eskimo HP 2 	Шина Sava 205/50R17 93V XL Sava Eskimo HP 2  розмір 205/50R17. Виробник: Польща	Польща	2524	Passenger	SM000017398	4	3775.00	93V	Sava	XL Sava Eskimo HP 2	205.0	50.0	R	17.0	/	93	V	\N	30	22
330	205/55R17 95R XL Nokian Hakkapeliitta R5 FR	Шина Nokian 205/55R17 95R XL Nokian Hakkapeliitta R5 FR розмір 205/55R17. Виробник: Фінляндія	Фінляндія	4024	Passenger	SM000009009	4	6096.00	95R	Nokian	XL Nokian Hakkapeliitta R5 FR	205.0	55.0	R	17.0	/	95	R	\N	15	116
331	215/40R17 87V XL TIGAR WINTER FR	Шина TIGAR 215/40R17 87V XL TIGAR WINTER FR розмір 215/40R17. Виробник: Сербія	Сербія	2323	Passenger	SM000011827	4	2839.00	87V	TIGAR	XL TIGAR WINTER FR	215.0	40.0	R	17.0	/	87	V	\N	31	235
332	215/45R17 91V XL Sailun Ice Blazer Alpine EVO 1 FR	Шина Sailun 215/45R17 91V XL Sailun Ice Blazer Alpine EVO 1 FR розмір 215/45R17. Виробник: Китай	Китай	2024	Passenger	SM000017604	4	2578.00	91V	Sailun	XL Sailun Ice Blazer Alpine EVO 1 FR	215.0	45.0	R	17.0	/	91	V	\N	29	325
333	215/50R17 95V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 215/50R17 95V XL Nexen WinGuard Sport 2 WU7 FR розмір 215/50R17. Виробник: Корея	Корея	2023	Passenger	SM000003523	2	3623.00	95V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	215.0	50.0	R	17.0	/	95	V	\N	26	107
334	215/50R17 95V XL TIGAR WINTER FR	Шина TIGAR 215/50R17 95V XL TIGAR WINTER FR розмір 215/50R17. Виробник: Сербія	Сербія	2324	Passenger	SM000006411	2	3145.00	95V	TIGAR	XL TIGAR WINTER FR	215.0	50.0	R	17.0	/	95	V	\N	31	235
335	215/55R17 98H XL Continental WinterContact TS 870 P 	Шина Continental 215/55R17 98H XL Continental WinterContact TS 870 P  розмір 215/55R17. Виробник: Франція	Франція	4323	Passenger	SM000010302	4	6724.00	98H	Continental	XL Continental WinterContact TS 870 P	215.0	55.0	R	17.0	/	98	H	\N	6	297
336	215/55R17 98V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 215/55R17 98V XL Nexen WinGuard Sport 2 WU7 FR розмір 215/55R17. Виробник: Корея	Корея	1923	Passenger	SM000003525	2	4011.00	98V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	215.0	55.0	R	17.0	/	98	V	\N	26	107
337	215/55R17 98V XL TIGAR WINTER FR	Шина TIGAR 215/55R17 98V XL TIGAR WINTER FR розмір 215/55R17. Виробник: Сербія	Сербія	3124	Passenger	SM000006413	2	3308.00	98V	TIGAR	XL TIGAR WINTER FR	215.0	55.0	R	17.0	/	98	V	\N	31	235
338	225/45R17 91H Nokian Snowproof 2 FR	Шина Nokian 225/45R17 91H Nokian Snowproof 2 FR розмір 225/45R17. Виробник: Фінляндія	Фінляндія	3323	Passenger	SM000006028	6	4200.00	91H	Nokian	Snowproof 2 FR	225.0	45.0	R	17.0	/	91	H	\N	15	74
339	225/45R17 94V XL Sava Eskimo HP 2 FR	Шина Sava 225/45R17 94V XL Sava Eskimo HP 2 FR розмір 225/45R17. Виробник: Німеччина	Німеччина	2724	Passenger	SM000017403	4	3518.00	94V	Sava	XL Sava Eskimo HP 2 FR	225.0	45.0	R	17.0	/	94	V	\N	30	277
340	225/50R17 94H Nokian Snowproof 2 	Шина Nokian 225/50R17 94H Nokian Snowproof 2  розмір 225/50R17. Виробник: Фінляндія	Фінляндія	2324	Passenger	SM000005846	2	4410.00	94H	Nokian	Snowproof 2	225.0	50.0	R	17.0	/	94	H	\N	15	263
341	225/50R17 98T XL Nexen WinGuard WinSpike 3 пш FR	Шина Nexen 225/50R17 98T XL Nexen WinGuard WinSpike 3 пш FR розмір 225/50R17. Виробник: Корея	Корея	2123	Passenger	SM000003555	4	3833.00	98T	Nexen	XL Nexen WinGuard WinSpike 3 пш FR	225.0	50.0	R	17.0	/	98	T	\N	26	42
342	225/50R17 98V XL Matador MP-93 Nordicca FR	Шина Matador 225/50R17 98V XL Matador MP-93 Nordicca FR розмір 225/50R17. Виробник: Румунія	Румунія	4124	Passenger	SM000002829	4	3696.00	98V	Matador	XL Matador MP-93 Nordicca FR	225.0	50.0	R	17.0	/	98	V	\N	25	310
343	225/50R17 98V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 225/50R17 98V XL Nexen WinGuard Sport 2 WU7 FR розмір 225/50R17. Виробник: Корея	Корея	2923	Passenger	SM000003526	4	3465.00	98V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	225.0	50.0	R	17.0	/	98	V	\N	26	107
344	225/55R17 101H XL Sailun Ice Blazer Arctic ROF FR	Шина Sailun 225/55R17 101H XL Sailun Ice Blazer Arctic ROF FR розмір 225/55R17. Виробник: Китай	Китай	2024	Passenger	SM000015459	6	4179.00	101H	Sailun	XL Sailun Ice Blazer Arctic ROF FR	225.0	55.0	R	17.0	/	101	H	\N	29	303
345	225/55R17 101R XL Triangle SnowLink Trin PL01 	Шина Triangle 225/55R17 101R XL Triangle SnowLink Trin PL01  розмір 225/55R17. Виробник: Китай	Китай	3324	Passenger	SM000012087	4	3234.00	101R	Triangle	XL Triangle SnowLink Trin PL01	225.0	55.0	R	17.0	/	101	R	\N	33	99
346	225/55R17 101V XL Sailun Ice Blazer Alpine EVO 1 	Шина Sailun 225/55R17 101V XL Sailun Ice Blazer Alpine EVO 1  розмір 225/55R17. Виробник: Китай	Китай	3224	Passenger	SM000009443	8	3064.00	101V	Sailun	XL Sailun Ice Blazer Alpine EVO 1	225.0	55.0	R	17.0	/	101	V	\N	29	104
347	225/55R17 101V XL Sava Eskimo HP 2 FR	Шина Sava 225/55R17 101V XL Sava Eskimo HP 2 FR розмір 225/55R17. Виробник: Німеччина	Німеччина	3623	Passenger	SM000006579	8	4174.00	101V	Sava	XL Sava Eskimo HP 2 FR	225.0	55.0	R	17.0	/	101	V	\N	30	277
348	225/55R17 101V XL TIGAR WINTER FR	Шина TIGAR 225/55R17 101V XL TIGAR WINTER FR розмір 225/55R17. Виробник: Сербія	Сербія	2024	Passenger	SM000006422	8	3413.00	101V	TIGAR	XL TIGAR WINTER FR	225.0	55.0	R	17.0	/	101	V	\N	31	235
349	225/55R17 97H Nokian Snowproof 2 	Шина Nokian 225/55R17 97H Nokian Snowproof 2  розмір 225/55R17. Виробник: Фінляндія	Фінляндія	3423	Passenger	SM000015930	12	4515.00	97H	Nokian	Snowproof 2	225.0	55.0	R	17.0	/	97	H	\N	15	263
350	235/45R17 94H Sailun Ice Blazer Arctic FR	Шина Sailun 235/45R17 94H Sailun Ice Blazer Arctic FR розмір 235/45R17. Виробник: Китай	Китай	1824	Passenger	SM000008614	2	2665.00	94H	Sailun	Ice Blazer Arctic FR	235.0	45.0	R	17.0	/	94	H	\N	29	103
351	235/50R17 100T XL Nexen WinGuard Ice 3 	Шина Nexen 235/50R17 100T XL Nexen WinGuard Ice 3  розмір 235/50R17. Виробник: Корея	Корея	2424	Passenger	SM000003669	8	5450.00	100T	Nexen	XL Nexen WinGuard Ice 3	235.0	50.0	R	17.0	/	100	T	\N	26	15
352	235/55R17 103V XL Nokian WR Snowproof P 	Шина Nokian 235/55R17 103V XL Nokian WR Snowproof P  розмір 235/55R17. Виробник: Фінляндія	Фінляндія	2424	Passenger	SM000006963	2	6383.00	103V	Nokian	XL Nokian WR Snowproof P	235.0	55.0	R	17.0	/	103	V	\N	15	57
353	235/55R17 103V XL TIGAR WINTER FR	Шина TIGAR 235/55R17 103V XL TIGAR WINTER FR розмір 235/55R17. Виробник: Сербія	Сербія	4524	Passenger	SM000006432	6	3491.00	103V	TIGAR	XL TIGAR WINTER FR	235.0	55.0	R	17.0	/	103	V	\N	31	235
354	235/55R17 99T Nexen WinGuard ice 3 	Шина Nexen 235/55R17 99T Nexen WinGuard ice 3  розмір 235/55R17. Виробник: Корея	Корея	824 	Passenger	SM000017606	12	4358.00	99T	Nexen	WinGuard ice 3	235.0	55.0	R	17.0	/	99	T	\N	26	37
355	245/45R17 99V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 245/45R17 99V XL Nexen WinGuard Sport 2 WU7 FR розмір 245/45R17. Виробник: Корея	Корея	2024	Passenger	SM000003458	4	4809.00	99V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	245.0	45.0	R	17.0	/	99	V	\N	26	107
356	225/40R18 92V XL Nokian WR Snowproof P FR	Шина Nokian 225/40R18 92V XL Nokian WR Snowproof P FR розмір 225/40R18. Виробник: Фінляндія	Фінляндія	5223	Passenger	SM000015945	6	4620.00	92V	Nokian	XL Nokian WR Snowproof P FR	225.0	40.0	R	18.0	/	92	V	\N	15	194
357	225/40R18 92V XL TIGAR WINTER FR	Шина TIGAR 225/40R18 92V XL TIGAR WINTER FR розмір 225/40R18. Виробник: Сербія	Сербія	5023	Passenger	SM000008832	12	2993.00	92V	TIGAR	XL TIGAR WINTER FR	225.0	40.0	R	18.0	/	92	V	\N	31	235
358	225/45R18 95V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 225/45R18 95V XL Nexen WinGuard Sport 2 WU7 FR розмір 225/45R18. Виробник: Корея	Корея	2323	Passenger	SM000003459	12	4195.00	95V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	225.0	45.0	R	18.0	/	95	V	\N	26	107
359	225/50R18 95H Michelin X-Ice XI3 ZP 	Шина Michelin 225/50R18 95H Michelin X-Ice XI3 ZP  розмір 225/50R18. Виробник: Італія	Італія	2324	Passenger	SM000000222	4	9713.00	95H	Michelin	X-Ice XI3 ZP	225.0	50.0	R	18.0	/	95	H	\N	13	82
360	225/50R18 99R XL Nokian Hakkapeliitta R5 	Шина Nokian 225/50R18 99R XL Nokian Hakkapeliitta R5  розмір 225/50R18. Виробник: Фінляндія	Фінляндія	4824	Passenger	SM000017644	8	8216.00	99R	Nokian	XL Nokian Hakkapeliitta R5	225.0	50.0	R	18.0	/	99	R	\N	15	265
361	225/50R18 99V XL Triangle SnowLink Trin PL02 FR	Шина Triangle 225/50R18 99V XL Triangle SnowLink Trin PL02 FR розмір 225/50R18. Виробник: Китай	Китай	3724	Passenger	SM000012086	4	3749.00	99V	Triangle	XL Triangle SnowLink Trin PL02 FR	225.0	50.0	R	18.0	/	99	V	\N	33	134
362	235/40R18 91T Federal Himalaya WS2 пш FR	Шина Federal 235/40R18 91T Federal Himalaya WS2 пш FR розмір 235/40R18. Виробник: Тайвань	Тайвань	2021	Passenger	SM000009576	4	2678.00	91T	Federal	Himalaya WS2 пш FR	235.0	40.0	R	18.0	/	91	T	\N	9	51
363	235/40R18 95T Hankook Winter I*Cept iZ2 W616 FR	Шина Hankook 235/40R18 95T Hankook Winter I*Cept iZ2 W616 FR розмір 235/40R18. Виробник: Корея	Корея	2923	Passenger	SM000015654	2	6668.00	95T	Hankook	Winter I*Cept iZ2 W616 FR	235.0	40.0	R	18.0	/	95	T	\N	12	185
364	235/40R18 95V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 235/40R18 95V XL Nexen WinGuard Sport 2 WU7 FR розмір 235/40R18. Виробник: Корея	Корея	2823	Passenger	SM000017562	6	5234.00	95V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	235.0	40.0	R	18.0	/	95	V	\N	26	107
365	235/40R18 95V XL Nokian WR Snowproof P FR	Шина Nokian 235/40R18 95V XL Nokian WR Snowproof P FR розмір 235/40R18. Виробник: Фінляндія	Фінляндія	2224	Passenger	SM000006965	4	6689.00	95V	Nokian	XL Nokian WR Snowproof P FR	235.0	40.0	R	18.0	/	95	V	\N	15	194
366	235/45R18 98T XL Nexen WinGuard WinSpike 3 пш FR	Шина Nexen 235/45R18 98T XL Nexen WinGuard WinSpike 3 пш FR розмір 235/45R18. Виробник: Корея	Корея	1724	Passenger	SM000017624	8	4977.00	98T	Nexen	XL Nexen WinGuard WinSpike 3 пш FR	235.0	45.0	R	18.0	/	98	T	\N	26	42
367	245/40R18 97T XL Nexen Winguard Ice Plus WH43 FR	Шина Nexen 245/40R18 97T XL Nexen Winguard Ice Plus WH43 FR розмір 245/40R18. Виробник: Корея	Корея	1924	Passenger	SM000017588	4	5544.00	97T	Nexen	XL Nexen Winguard Ice Plus WH43 FR	245.0	40.0	R	18.0	/	97	T	\N	26	195
368	245/40R18 97T XL Nexen WinGuard WinSpike 3 пш FR	Шина Nexen 245/40R18 97T XL Nexen WinGuard WinSpike 3 пш FR розмір 245/40R18. Виробник: Корея	Корея	1924	Passenger	SM000017590	4	5198.00	97T	Nexen	XL Nexen WinGuard WinSpike 3 пш FR	245.0	40.0	R	18.0	/	97	T	\N	26	42
369	245/40R18 97V XL Nokian WR Snowproof P FR	Шина Nokian 245/40R18 97V XL Nokian WR Snowproof P FR розмір 245/40R18. Виробник: Фінляндія	Фінляндія	223 	Passenger	SM000015948	3	5723.00	97V	Nokian	XL Nokian WR Snowproof P FR	245.0	40.0	R	18.0	/	97	V	\N	15	194
370	245/45R18 100T XL Hankook Winter I*Cept iZ2 W616 FR	Шина Hankook 245/45R18 100T XL Hankook Winter I*Cept iZ2 W616 FR розмір 245/45R18. Виробник: Корея	Корея	3023	Passenger	SM000015655	2	6699.00	100T	Hankook	XL Hankook Winter I*Cept iZ2 W616 FR	245.0	45.0	R	18.0	/	100	T	\N	12	281
371	245/45R18 100V XL Laufenn I FIT+ LW31 FR	Шина Laufenn 245/45R18 100V XL Laufenn I FIT+ LW31 FR розмір 245/45R18. Виробник: Угорщина	Угорщина	4623	Passenger	SM000017087	4	4195.00	100V	Laufenn	XL Laufenn I FIT+ LW31 FR	245.0	45.0	R	18.0	/	100	V	\N	24	166
372	245/45R18 100V XL Michelin Pilot Alpin 5 FR	Шина Michelin 245/45R18 100V XL Michelin Pilot Alpin 5 FR розмір 245/45R18. Виробник: Іспанія	Іспанія	3924	Passenger	SM000010151	2	8348.00	100V	Michelin	XL Michelin Pilot Alpin 5 FR	245.0	45.0	R	18.0	/	100	V	\N	13	126
373	245/45R18 100V XL Sava Eskimo HP 2 	Шина Sava 245/45R18 100V XL Sava Eskimo HP 2  розмір 245/45R18. Виробник: Німеччина	Німеччина	2223	Passenger	SM000017405	4	4699.00	100V	Sava	XL Sava Eskimo HP 2	245.0	45.0	R	18.0	/	100	V	\N	30	22
374	245/45R18 100V XL TIGAR WINTER FR	Шина TIGAR 245/45R18 100V XL TIGAR WINTER FR розмір 245/45R18. Виробник: Сербія	Сербія	2524	Passenger	SM000000192	4	3754.00	100V	TIGAR	XL TIGAR WINTER FR	245.0	45.0	R	18.0	/	100	V	\N	31	235
375	245/50R18 104T XL Goodyear UltraGrip ICE ARCTIC шип FR	Шина Goodyear 245/50R18 104T XL Goodyear UltraGrip ICE ARCTIC шип FR розмір 245/50R18. Виробник: Польща	Польща	2021	Passenger	SM000005636	1	6038.00	104T	Goodyear	XL Goodyear UltraGrip ICE ARCTIC шип FR	245.0	50.0	R	18.0	/	104	T	\N	11	219
376	255/45R18 103V XL Sailun Ice Blazer Alpine EVO 1 FR	Шина Sailun 255/45R18 103V XL Sailun Ice Blazer Alpine EVO 1 FR розмір 255/45R18. Виробник: Китай	Китай	2824	Passenger	SM000012121	8	3999.00	103V	Sailun	XL Sailun Ice Blazer Alpine EVO 1 FR	255.0	45.0	R	18.0	/	103	V	\N	29	325
377	275/45R18 107V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 275/45R18 107V XL Nexen WinGuard Sport 2 WU7 FR розмір 275/45R18. Виробник: Корея	Корея	1924	Passenger	SM000017592	4	6820.00	107V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	275.0	45.0	R	18.0	/	107	V	\N	26	107
378	225/45R19 96V XL Nokian WR Snowproof P FR	Шина Nokian 225/45R19 96V XL Nokian WR Snowproof P FR розмір 225/45R19. Виробник: Фінляндія	Фінляндія	3223	Passenger	SM000006296	4	7245.00	96V	Nokian	XL Nokian WR Snowproof P FR	225.0	45.0	R	19.0	/	96	V	\N	15	194
379	235/35R19 91H XL Michelin X-Ice Snow FR	Шина Michelin 235/35R19 91H XL Michelin X-Ice Snow FR розмір 235/35R19. Виробник: Угорщина	Угорщина	1624	Passenger	SM000013645	2	10395.00	91H	Michelin	XL Michelin X-Ice Snow FR	235.0	35.0	R	19.0	/	91	H	\N	13	56
380	245/35R19 93W XL Michelin Pilot Alpin 5 FR	Шина Michelin 245/35R19 93W XL Michelin Pilot Alpin 5 FR розмір 245/35R19. Виробник: Італія	Італія	3524	Passenger	SM000013869	2	14012.00	93W	Michelin	XL Michelin Pilot Alpin 5 FR	245.0	35.0	R	19.0	/	93	W	\N	13	126
381	245/40R19 98T XL Nokian Hakkapeliitta R5 FR	Шина Nokian 245/40R19 98T XL Nokian Hakkapeliitta R5 FR розмір 245/40R19. Виробник: Фінляндія	Фінляндія	424 	Passenger	SM000006566	2	9559.00	98T	Nokian	XL Nokian Hakkapeliitta R5 FR	245.0	40.0	R	19.0	/	98	T	\N	15	116
382	245/40R19 98V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 245/40R19 98V XL Nexen WinGuard Sport 2 WU7 FR розмір 245/40R19. Виробник: Корея	Корея	2224	Passenger	SM000015812	8	7324.00	98V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	245.0	40.0	R	19.0	/	98	V	\N	26	107
383	245/45R19 102V XL Kleber Krisalp HP3 FR	Шина Kleber 245/45R19 102V XL Kleber Krisalp HP3 FR розмір 245/45R19. Виробник: Румунія	Румунія	3324	Passenger	SM000015382	8	7954.00	102V	Kleber	XL Kleber Krisalp HP3 FR	245.0	45.0	R	19.0	/	102	V	\N	21	161
384	255/35R19 96V WESTLAKE Z-507 Zuper Snow FR	Шина WESTLAKE 255/35R19 96V WESTLAKE Z-507 Zuper Snow FR розмір 255/35R19. Виробник: Китай	Китай	3024	Passenger	SM000017515	12	3339.00	96V	WESTLAKE	Z-507 Zuper Snow FR	255.0	35.0	R	19.0	/	96	V	\N	35	109
385	255/40R19 100T XL Nokian Hakkapeliitta R5 FR	Шина Nokian 255/40R19 100T XL Nokian Hakkapeliitta R5 FR розмір 255/40R19. Виробник: Фінляндія	Фінляндія	4423	Passenger	SM000017478	6	8348.00	100T	Nokian	XL Nokian Hakkapeliitta R5 FR	255.0	40.0	R	19.0	/	100	T	\N	15	116
687	215/60R17 96H Matador Hectorra 5 FR	Шина Matador 215/60R17 96H Matador Hectorra 5 FR розмір 215/60R17. Виробник: Словаччина	Словаччина	2124	SUV/4x4/	SM000014726	4	3770.00	96H	Matador	Hectorra 5 FR	215.0	60.0	R	17.0	/	96	H	\N	25	273
386	255/45R19 104V XL Nokian WR Snowproof P FR	Шина Nokian 255/45R19 104V XL Nokian WR Snowproof P FR розмір 255/45R19. Виробник: Фінляндія	Фінляндія	5223	Passenger	SM000015461	12	8006.00	104V	Nokian	XL Nokian WR Snowproof P FR	255.0	45.0	R	19.0	/	104	V	\N	15	194
387	275/35R19 100V XL Michelin Pilot Alpin 5 * FR	Шина Michelin 275/35R19 100V XL Michelin Pilot Alpin 5 * FR розмір 275/35R19. Виробник: Франція	Франція	3724	Passenger	SM000014273	2	15750.00	100V	Michelin	XL Michelin Pilot Alpin 5 * FR	275.0	35.0	R	19.0	/	100	V	\N	13	41
388	245/35R20 95V XL Michelin Pilot Alpin 5 NA2 FR	Шина Michelin 245/35R20 95V XL Michelin Pilot Alpin 5 NA2 FR розмір 245/35R20. Виробник: Франція	Франція	4024	Passenger	SM000016506	2	16170.00	95V	Michelin	XL Michelin Pilot Alpin 5 NA2 FR	245.0	35.0	R	20.0	/	95	V	\N	13	155
389	255/40R20 101V XL Michelin Pilot Alpin 4 MO FR	Шина Michelin 255/40R20 101V XL Michelin Pilot Alpin 4 MO FR розмір 255/40R20. Виробник: Угорщина	Угорщина	3624	Passenger	SM000000229	2	12952.00	101V	Michelin	XL Michelin Pilot Alpin 4 MO FR	255.0	40.0	R	20.0	/	101	V	\N	13	164
390	275/55R20 117R XL Nokian Hakkapeliitta R5 SUV 	Шина Nokian 275/55R20 117R XL Nokian Hakkapeliitta R5 SUV  розмір 275/55R20. Виробник: Фінляндія	Фінляндія	4722	Passenger	SM000017469	2	8138.00	117R	Nokian	XL Nokian Hakkapeliitta R5 SUV	275.0	55.0	R	20.0	/	117	R	\N	15	223
391	255/35R21 98W XL Michelin Pilot Alpin 5 FR	Шина Michelin 255/35R21 98W XL Michelin Pilot Alpin 5 FR розмір 255/35R21. Виробник: Угорщина	Угорщина	4024	Passenger	SM000003333	2	14438.00	98W	Michelin	XL Michelin Pilot Alpin 5 FR	255.0	35.0	R	21.0	/	98	W	\N	13	126
392	165/65R14 79T Sava ALL WEATHER 	Шина Sava 165/65R14 79T Sava ALL WEATHER  розмір 165/65R14. Виробник: Польща	Польща	823 	Passenger	SM000013258	1	1575.00	79T	Sava	ALL WEATHER	165.0	65.0	R	14.0	/	79	T	\N	30	197
393	185/60R14 82H Sailun Atrezzo 4 Seasons FR	Шина Sailun 185/60R14 82H Sailun Atrezzo 4 Seasons FR розмір 185/60R14. Виробник: Китай	Китай	2124	Passenger	SM000017541	8	1964.00	82H	Sailun	Atrezzo 4 Seasons FR	185.0	60.0	R	14.0	/	82	H	\N	29	12
394	185/65R14 86H Goodyear Vector 4 Seasons G3 	Шина Goodyear 185/65R14 86H Goodyear Vector 4 Seasons G3  розмір 185/65R14. Виробник: Польща	Польща	5121	Passenger	SM000012232	1	1838.00	86H	Goodyear	Vector 4 Seasons G3	185.0	65.0	R	14.0	/	86	H	\N	11	222
395	185/65R14 86T Sailun Atrezzo 4 Seasons FR	Шина Sailun 185/65R14 86T Sailun Atrezzo 4 Seasons FR розмір 185/65R14. Виробник: Китай	Китай	2124	Passenger	SM000007102	8	1985.00	86T	Sailun	Atrezzo 4 Seasons FR	185.0	65.0	R	14.0	/	86	T	\N	29	12
396	185/60R15 88H XL Sailun Atrezzo 4 Seasons FR	Шина Sailun 185/60R15 88H XL Sailun Atrezzo 4 Seasons FR розмір 185/60R15. Виробник: Китай	Китай	2524	Passenger	SM000004710	4	2079.00	88H	Sailun	XL Sailun Atrezzo 4 Seasons FR	185.0	60.0	R	15.0	/	88	H	\N	29	93
397	185/65R15 88T Sailun Atrezzo 4 Seasons FR	Шина Sailun 185/65R15 88T Sailun Atrezzo 4 Seasons FR розмір 185/65R15. Виробник: Китай	Китай	4723	Passenger	SM000007103	2	1964.00	88T	Sailun	Atrezzo 4 Seasons FR	185.0	65.0	R	15.0	/	88	T	\N	29	12
398	195/65R15 91T Sailun Atrezzo 4 Seasons FR	Шина Sailun 195/65R15 91T Sailun Atrezzo 4 Seasons FR розмір 195/65R15. Виробник: Китай	Китай	4323	Passenger	SM000008457	6	2126.00	91T	Sailun	Atrezzo 4 Seasons FR	195.0	65.0	R	15.0	/	91	T	\N	29	12
399	215/60R16 99H XL Sailun Atrezzo 4 Seasons FR	Шина Sailun 215/60R16 99H XL Sailun Atrezzo 4 Seasons FR розмір 215/60R16. Виробник: Китай	Китай	4123	Passenger	SM000007109	6	2757.00	99H	Sailun	XL Sailun Atrezzo 4 Seasons FR	215.0	60.0	R	16.0	/	99	H	\N	29	93
400	205/50R17 93W XL Laufenn G FIT 4S LH71 FR	Шина Laufenn 205/50R17 93W XL Laufenn G FIT 4S LH71 FR розмір 205/50R17. Виробник: Угорщина	Угорщина	924 	Passenger	SM000016810	4	3404.00	93W	Laufenn	XL Laufenn G FIT 4S LH71 FR	205.0	50.0	R	17.0	/	93	W	\N	24	58
401	135/80R13 74T XL Laufenn G FIT EQ+ LK41 	Шина Laufenn 135/80R13 74T XL Laufenn G FIT EQ+ LK41  розмір 135/80R13. Виробник: Угорщина	Угорщина	324 	Passenger	SM000016347	4	1454.00	74T	Laufenn	XL Laufenn G FIT EQ+ LK41	135.0	80.0	R	13.0	/	74	T	\N	24	26
402	155/70R13 75T GRENLANDER L-GRIP16 	Шина GRENLANDER 155/70R13 75T GRENLANDER L-GRIP16  розмір 155/70R13. Виробник: Китай	Китай	224 	Passenger	SM000013265	2	1134.00	75T	GRENLANDER	L-GRIP16	155.0	70.0	R	13.0	/	75	T	\N	18	267
403	155/80R13 79T Laufenn G FIT EQ+ LK41 	Шина Laufenn 155/80R13 79T Laufenn G FIT EQ+ LK41  розмір 155/80R13. Виробник: Угорщина	Угорщина	124 	Passenger	SM000016923	4	1638.00	79T	Laufenn	G FIT EQ+ LK41	155.0	80.0	R	13.0	/	79	T	\N	24	30
404	175/70R13 82T Sailun Atrezzo Eco 	Шина Sailun 175/70R13 82T Sailun Atrezzo Eco  розмір 175/70R13. Виробник: Китай	Китай	5023	Passenger	SM000006831	2	1517.00	82T	Sailun	Atrezzo Eco	175.0	70.0	R	13.0	/	82	T	\N	29	150
405	185/70R13 86T GRENLANDER COLO H01 	Шина GRENLANDER 185/70R13 86T GRENLANDER COLO H01  розмір 185/70R13. Виробник: Китай	Китай	4323	Passenger	SM000013551	4	1523.00	86T	GRENLANDER	COLO H01	185.0	70.0	R	13.0	/	86	T	\N	18	14
406	155/65R14 75T Sailun Atrezzo Eco 	Шина Sailun 155/65R14 75T Sailun Atrezzo Eco  розмір 155/65R14. Виробник: Китай	Китай	4523	Passenger	SM000016155	4	1397.00	75T	Sailun	Atrezzo Eco	155.0	65.0	R	14.0	/	75	T	\N	29	150
407	165/65R14 79T GRENLANDER COLO H01 	Шина GRENLANDER 165/65R14 79T GRENLANDER COLO H01  розмір 165/65R14. Виробник: Китай	Китай	823 	Passenger	SM000014038	4	1344.00	79T	GRENLANDER	COLO H01	165.0	65.0	R	14.0	/	79	T	\N	18	14
408	165/70R14 81T Sailun Atrezzo Eco 	Шина Sailun 165/70R14 81T Sailun Atrezzo Eco  розмір 165/70R14. Виробник: Китай	Китай	3823	Passenger	SM000007100	4	1523.00	81T	Sailun	Atrezzo Eco	165.0	70.0	R	14.0	/	81	T	\N	29	150
409	175/65R14 82H Lassa Greenways 	Шина Lassa 175/65R14 82H Lassa Greenways  розмір 175/65R14. Виробник: Туреччина	Туреччина	125 	Passenger	SM000006857	8	2158.00	82H	Lassa	Greenways	175.0	65.0	R	14.0	/	82	H	\N	23	258
410	175/65R14 86T XL Laufenn G FIT EQ+ LK41 	Шина Laufenn 175/65R14 86T XL Laufenn G FIT EQ+ LK41  розмір 175/65R14. Виробник: Угорщина	Угорщина	1423	Passenger	SM000016268	2	1680.00	86T	Laufenn	XL Laufenn G FIT EQ+ LK41	175.0	65.0	R	14.0	/	86	T	\N	24	26
411	175/70R14 88T XL GRENLANDER COLO H02 	Шина GRENLANDER 175/70R14 88T XL GRENLANDER COLO H02  розмір 175/70R14. Виробник: Китай	Китай	124 	Passenger	SM000013548	12	1422.00	88T	GRENLANDER	XL GRENLANDER COLO H02	175.0	70.0	R	14.0	/	88	T	\N	18	54
412	175/80R14 88H Triangle TE301 	Шина Triangle 175/80R14 88H Triangle TE301  розмір 175/80R14. Виробник: Китай	Китай	223 	Passenger	SM000011636	2	1806.00	88H	Triangle	TE301	175.0	80.0	R	14.0	/	88	H	\N	33	300
413	185/60R14 82H Apollo Alnac 4G 	Шина Apollo 185/60R14 82H Apollo Alnac 4G  розмір 185/60R14. Виробник: Індія	Індія	4723	Passenger	SM000016884	0	1884.00	82H	Apollo	Alnac 4G	185.0	60.0	R	14.0	/	82	H	\N	2	270
414	185/65R14 86H Apollo Alnac 4G 	Шина Apollo 185/65R14 86H Apollo Alnac 4G  розмір 185/65R14. Виробник: Індія	Індія	2023	Passenger	SM000016885	0	2069.00	86H	Apollo	Alnac 4G	185.0	65.0	R	14.0	/	86	H	\N	2	270
415	185/65R14 86H GRENLANDER COLO H02 	Шина GRENLANDER 185/65R14 86H GRENLANDER COLO H02  розмір 185/65R14. Виробник: Китай	Китай	124 	Passenger	SM000016972	2	1449.00	86H	GRENLANDER	COLO H02	185.0	65.0	R	14.0	/	86	H	\N	18	283
416	185/65R14 86H Lassa Greenways 	Шина Lassa 185/65R14 86H Lassa Greenways  розмір 185/65R14. Виробник: Туреччина	Туреччина	125 	Passenger	SM000005096	8	2405.00	86H	Lassa	Greenways	185.0	65.0	R	14.0	/	86	H	\N	23	258
417	185/70R14 88T GRENLANDER L-GRIP16 	Шина GRENLANDER 185/70R14 88T GRENLANDER L-GRIP16  розмір 185/70R14. Виробник: Китай	Китай	4223	Passenger	SM000016973	4	1570.00	88T	GRENLANDER	L-GRIP16	185.0	70.0	R	14.0	/	88	T	\N	18	267
418	195/70R14 91H GRENLANDER COLO H01 	Шина GRENLANDER 195/70R14 91H GRENLANDER COLO H01  розмір 195/70R14. Виробник: Китай	Китай	124 	Passenger	SM000016975	8	1806.00	91H	GRENLANDER	COLO H01	195.0	70.0	R	14.0	/	91	H	\N	18	14
419	195/70R14 91T Laufenn G FIT EQ+ LK41 	Шина Laufenn 195/70R14 91T Laufenn G FIT EQ+ LK41  розмір 195/70R14. Виробник: Угорщина	Угорщина	824 	Passenger	SM000016856	12	2415.00	91T	Laufenn	G FIT EQ+ LK41	195.0	70.0	R	14.0	/	91	T	\N	24	30
420	175/65R15 84H Triangle TE301 	Шина Triangle 175/65R15 84H Triangle TE301  розмір 175/65R15. Виробник: Китай	Китай	223 	Passenger	SM000011661	2	1607.00	84H	Triangle	TE301	175.0	65.0	R	15.0	/	84	H	\N	33	300
421	185/55R15 82V GRENLANDER COLO H02 	Шина GRENLANDER 185/55R15 82V GRENLANDER COLO H02  розмір 185/55R15. Виробник: Китай	Китай	723 	Passenger	SM000014042	2	1470.00	82V	GRENLANDER	COLO H02	185.0	55.0	R	15.0	/	82	V	\N	18	283
422	185/55R15 82V Kormoran Road Performance FR	Шина Kormoran 185/55R15 82V Kormoran Road Performance FR розмір 185/55R15. Виробник: Сербія	Сербія	924 	Passenger	SM000013779	4	2074.00	82V	Kormoran	Road Performance FR	185.0	55.0	R	15.0	/	82	V	\N	22	19
423	185/60R15 84H Kormoran Road Performance 	Шина Kormoran 185/60R15 84H Kormoran Road Performance  розмір 185/60R15. Виробник: Сербія	Сербія	1324	Passenger	SM000016953	2	1995.00	84H	Kormoran	Road Performance	185.0	60.0	R	15.0	/	84	H	\N	22	316
424	185/65R15 88H VREDESTEIN ULTRAC 	Шина VREDESTEIN 185/65R15 88H VREDESTEIN ULTRAC  розмір 185/65R15. Виробник: Угорщина	Угорщина	5123	Passenger	SM000004412	4	2583.00	88H	VREDESTEIN	ULTRAC	185.0	65.0	R	15.0	/	88	H	\N	34	282
425	195/50R15 82H Sailun Atrezzo Elite FR	Шина Sailun 195/50R15 82H Sailun Atrezzo Elite FR розмір 195/50R15. Виробник: Китай	Китай	4123	Passenger	SM000007113	4	1943.00	82H	Sailun	Atrezzo Elite FR	195.0	50.0	R	15.0	/	82	H	\N	29	287
426	195/55R15 85V Kormoran Road Performance FR	Шина Kormoran 195/55R15 85V Kormoran Road Performance FR розмір 195/55R15. Виробник: Сербія	Сербія	824 	Passenger	SM000013176	2	2042.00	85V	Kormoran	Road Performance FR	195.0	55.0	R	15.0	/	85	V	\N	22	19
427	195/65R15 91H Nexen NFera SU1 	Шина Nexen 195/65R15 91H Nexen NFera SU1  розмір 195/65R15. Виробник: Корея	Корея	3524	Passenger	SM000003564	8	2210.00	91H	Nexen	NFera SU1	195.0	65.0	R	15.0	/	91	H	\N	26	140
428	195/65R15 91T Matador Hectorra 5 	Шина Matador 195/65R15 91T Matador Hectorra 5  розмір 195/65R15. Виробник: Словаччина	Словаччина	1524	Passenger	SM000015901	4	2294.00	91T	Matador	Hectorra 5	195.0	65.0	R	15.0	/	91	T	\N	25	271
429	195/65R15 91T Nexen NBlue Premium 	Шина Nexen 195/65R15 91T Nexen NBlue Premium  розмір 195/65R15. Виробник: Корея	Корея	4224	Passenger	SM000016230	2	2157.00	91T	Nexen	NBlue Premium	195.0	65.0	R	15.0	/	91	T	\N	26	160
430	195/65R15 91V Lassa Revola 	Шина Lassa 195/65R15 91V Lassa Revola  розмір 195/65R15. Виробник: Туреччина	Туреччина	5124	Passenger	SM000004961	8	2447.00	91V	Lassa	Revola	195.0	65.0	R	15.0	/	91	V	\N	23	239
431	205/65R15 94H Lassa Revola 	Шина Lassa 205/65R15 94H Lassa Revola  розмір 205/65R15. Виробник: Туреччина	Туреччина	225 	Passenger	SM000005622	8	3040.00	94H	Lassa	Revola	205.0	65.0	R	15.0	/	94	H	\N	23	239
432	205/65R15 99T XL Hankook Kinergy Eco2 K435 	Шина Hankook 205/65R15 99T XL Hankook Kinergy Eco2 K435  розмір 205/65R15. Виробник: Угорщина	Угорщина	624 	Passenger	SM000002542	12	3465.00	99T	Hankook	XL Hankook Kinergy Eco2 K435	205.0	65.0	R	15.0	/	99	T	\N	12	110
433	195/45R16 84V XL Fulda EcoControl HP 2 FR	Шина Fulda 195/45R16 84V XL Fulda EcoControl HP 2 FR розмір 195/45R16. Виробник: Франція	Франція	1622	Passenger	SM000013260	4	2625.00	84V	Fulda	XL Fulda EcoControl HP 2 FR	195.0	45.0	R	16.0	/	84	V	\N	17	35
434	195/55R16 87H Firestone ROADHAWK  	Шина Firestone 195/55R16 87H Firestone ROADHAWK   розмір 195/55R16. Виробник: Угорщина	Угорщина	3924	Passenger	SM000017885	12	2923.00	87H	Firestone	ROADHAWK	195.0	55.0	R	16.0	/	87	H	\N	10	192
435	195/55R16 87V Laufenn S FIT EQ LK01 FR	Шина Laufenn 195/55R16 87V Laufenn S FIT EQ LK01 FR розмір 195/55R16. Виробник: Угорщина	Угорщина	4423	Passenger	SM000013408	4	2604.00	87V	Laufenn	S FIT EQ LK01 FR	195.0	55.0	R	16.0	/	87	V	\N	24	177
436	205/55R16 91W Nexen NFera SU1 FR	Шина Nexen 205/55R16 91W Nexen NFera SU1 FR розмір 205/55R16. Виробник: Корея	Корея	3924	Passenger	SM000017882	4	2494.00	91W	Nexen	NFera SU1 FR	205.0	55.0	R	16.0	/	91	W	\N	26	216
437	205/55R16 91Y Matador Hectorra 5 	Шина Matador 205/55R16 91Y Matador Hectorra 5  розмір 205/55R16. Виробник: Німеччина	Німеччина	623 	Passenger	SM000017615	4	2636.00	91Y	Matador	Hectorra 5	205.0	55.0	R	16.0	/	91	Y	\N	25	271
438	205/60R16 92H Nexen NBlue S 	Шина Nexen 205/60R16 92H Nexen NBlue S  розмір 205/60R16. Виробник: Корея	Корея	3624	Passenger	SM000017881	12	3122.00	92H	Nexen	NBlue S	205.0	60.0	R	16.0	/	92	H	\N	26	97
439	205/60R16 92H Nexen NFera SU1 FR	Шина Nexen 205/60R16 92H Nexen NFera SU1 FR розмір 205/60R16. Виробник: Корея	Корея	3924	Passenger	SM000013112	4	3166.00	92H	Nexen	NFera SU1 FR	205.0	60.0	R	16.0	/	92	H	\N	26	216
440	205/65R16 95H Nexen NBlue HD Plus 	Шина Nexen 205/65R16 95H Nexen NBlue HD Plus  розмір 205/65R16. Виробник: Корея	Корея	3324	Passenger	SM000003567	2	3549.00	95H	Nexen	NBlue HD Plus	205.0	65.0	R	16.0	/	95	H	\N	26	200
441	215/45R16 90V XL Triangle EffeXSport TH202 FR	Шина Triangle 215/45R16 90V XL Triangle EffeXSport TH202 FR розмір 215/45R16. Виробник: Китай	Китай	5423	Passenger	SM000016858	4	2258.00	90V	Triangle	XL Triangle EffeXSport TH202 FR	215.0	45.0	R	16.0	/	90	V	\N	33	326
442	215/55R16 93V Matador Hectorra 5 	Шина Matador 215/55R16 93V Matador Hectorra 5  розмір 215/55R16. Виробник: Чехія	Чехія	1224	Passenger	SM000017647	0	3397.00	93V	Matador	Hectorra 5	215.0	55.0	R	16.0	/	93	V	\N	25	271
443	215/60R16 99H XL Nexen NBlue HD Plus 	Шина Nexen 215/60R16 99H XL Nexen NBlue HD Plus  розмір 215/60R16. Виробник: Корея	Корея	3824	Passenger	SM000013364	4	3617.00	99H	Nexen	XL Nexen NBlue HD Plus	215.0	60.0	R	16.0	/	99	H	\N	26	5
444	215/60R16 99V XL Lassa Revola 	Шина Lassa 215/60R16 99V XL Lassa Revola  розмір 215/60R16. Виробник: Туреччина	Туреччина	225 	Passenger	SM000004775	8	3833.00	99V	Lassa	XL Lassa Revola	215.0	60.0	R	16.0	/	99	V	\N	23	256
445	225/55R16 95V Kormoran Road Performance FR	Шина Kormoran 225/55R16 95V Kormoran Road Performance FR розмір 225/55R16. Виробник: Сербія	Сербія	1224	Passenger	SM000011728	4	2751.00	95V	Kormoran	Road Performance FR	225.0	55.0	R	16.0	/	95	V	\N	22	19
446	235/60R16 100W Sailun Atrezzo Elite 	Шина Sailun 235/60R16 100W Sailun Atrezzo Elite  розмір 235/60R16. Виробник: Китай	Китай	124 	Passenger	SM000006935	4	3129.00	100W	Sailun	Atrezzo Elite	235.0	60.0	R	16.0	/	100	W	\N	29	158
447	205/45R17 88W XL Firestone ROADHAWK 2 FR	Шина Firestone 205/45R17 88W XL Firestone ROADHAWK 2 FR розмір 205/45R17. Виробник: Угорщина	Угорщина	3824	Passenger	SM000017887	4	3560.00	88W	Firestone	XL Firestone ROADHAWK 2 FR	205.0	45.0	R	17.0	/	88	W	\N	10	29
448	205/50R17 89V Nexen NFera SU1 FR	Шина Nexen 205/50R17 89V Nexen NFera SU1 FR розмір 205/50R17. Виробник: Корея	Корея	223 	Passenger	SM000017888	12	2993.00	89V	Nexen	NFera SU1 FR	205.0	50.0	R	17.0	/	89	V	\N	26	216
449	205/55R17 95V XL Matador Hectorra 5 FR	Шина Matador 205/55R17 95V XL Matador Hectorra 5 FR розмір 205/55R17. Виробник: Франція	Франція	4723	Passenger	SM000013962	2	3465.00	95V	Matador	XL Matador Hectorra 5 FR	205.0	55.0	R	17.0	/	95	V	\N	25	20
450	205/55R17 95V XL Nexen NBlue HD Plus 	Шина Nexen 205/55R17 95V XL Nexen NBlue HD Plus  розмір 205/55R17. Виробник: Корея	Корея	4123	Passenger	SM000016227	10	3276.00	95V	Nexen	XL Nexen NBlue HD Plus	205.0	55.0	R	17.0	/	95	V	\N	26	5
451	205/55R17 95V XL VREDESTEIN ULTRAC FR	Шина VREDESTEIN 205/55R17 95V XL VREDESTEIN ULTRAC FR розмір 205/55R17. Виробник: Угорщина	Угорщина	5123	Passenger	SM000004414	4	4179.00	95V	VREDESTEIN	XL VREDESTEIN ULTRAC FR	205.0	55.0	R	17.0	/	95	V	\N	34	301
452	215/45R17 91Y XL VREDESTEIN ULTRAC FR	Шина VREDESTEIN 215/45R17 91Y XL VREDESTEIN ULTRAC FR розмір 215/45R17. Виробник: Угорщина	Угорщина	4923	Passenger	SM000004445	4	3644.00	91Y	VREDESTEIN	XL VREDESTEIN ULTRAC FR	215.0	45.0	R	17.0	/	91	Y	\N	34	301
453	215/50R17 95Y XL VREDESTEIN ULTRAC FR	Шина VREDESTEIN 215/50R17 95Y XL VREDESTEIN ULTRAC FR розмір 215/50R17. Виробник: Угорщина	Угорщина	824 	Passenger	SM000004446	8	4253.00	95Y	VREDESTEIN	XL VREDESTEIN ULTRAC FR	215.0	50.0	R	17.0	/	95	Y	\N	34	301
454	215/55R17 94V Hankook Ventus Prime4 K135 FR	Шина Hankook 215/55R17 94V Hankook Ventus Prime4 K135 FR розмір 215/55R17. Виробник: Угорщина	Угорщина	1424	Passenger	SM000016924	2	4410.00	94V	Hankook	Ventus Prime4 K135 FR	215.0	55.0	R	17.0	/	94	V	\N	12	112
455	215/55R17 94V Nexen NBlue HD Plus 	Шина Nexen 215/55R17 94V Nexen NBlue HD Plus  розмір 215/55R17. Виробник: Корея	Корея	4823	Passenger	SM000003579	4	3596.00	94V	Nexen	NBlue HD Plus	215.0	55.0	R	17.0	/	94	V	\N	26	200
456	215/55R17 94V Roadstone Classe Premiere CP672 	Шина Roadstone 215/55R17 94V Roadstone Classe Premiere CP672  розмір 215/55R17. Виробник: Корея	Корея	3723	Passenger	SM000005713	4	3591.00	94V	Roadstone	Classe Premiere CP672	215.0	55.0	R	17.0	/	94	V	\N	28	172
457	215/55R17 94W VREDESTEIN ULTRAC FR	Шина VREDESTEIN 215/55R17 94W VREDESTEIN ULTRAC FR розмір 215/55R17. Виробник: Угорщина	Угорщина	624 	Passenger	SM000004415	2	4148.00	94W	VREDESTEIN	ULTRAC FR	215.0	55.0	R	17.0	/	94	W	\N	34	102
458	225/45R17 91Y VREDESTEIN ULTRAC FR	Шина VREDESTEIN 225/45R17 91Y VREDESTEIN ULTRAC FR розмір 225/45R17. Виробник: Угорщина	Угорщина	324 	Passenger	SM000004442	4	3439.00	91Y	VREDESTEIN	ULTRAC FR	225.0	45.0	R	17.0	/	91	Y	\N	34	102
459	225/45R17 94Y XL Michelin Pilot Sport 5 FR	Шина Michelin 225/45R17 94Y XL Michelin Pilot Sport 5 FR розмір 225/45R17. Виробник: Польща	Польща	125 	Passenger	SM000011356	10	4195.00	94Y	Michelin	XL Michelin Pilot Sport 5 FR	225.0	45.0	R	17.0	/	94	Y	\N	13	187
470	235/55R17 99V Sailun Atrezzo Elite FR	Шина Sailun 235/55R17 99V Sailun Atrezzo Elite FR розмір 235/55R17. Виробник: Китай	Китай	524 	Passenger	SM000006851	4	3623.00	99V	Sailun	Atrezzo Elite FR	235.0	55.0	R	17.0	/	99	V	\N	29	287
460	225/50R17 94W Pirelli Cinturato P7 RUN FLAT MOE FR	Шина Pirelli 225/50R17 94W Pirelli Cinturato P7 RUN FLAT MOE FR розмір 225/50R17. Виробник: Румунія	Румунія	1024	Passenger	SM000016944	1	5581.00	94W	Pirelli	Cinturato P7 RUN FLAT MOE FR	225.0	50.0	R	17.0	/	94	W	\N	14	85
461	225/50R17 98V XL Matador Hectorra 5 FR	Шина Matador 225/50R17 98V XL Matador Hectorra 5 FR розмір 225/50R17. Виробник: Словаччина	Словаччина	824 	Passenger	SM000013965	4	3518.00	98V	Matador	XL Matador Hectorra 5 FR	225.0	50.0	R	17.0	/	98	V	\N	25	20
462	225/50R17 98W XL Nexen NFera RU1 FR	Шина Nexen 225/50R17 98W XL Nexen NFera RU1 FR розмір 225/50R17. Виробник: Корея	Корея	4123	Passenger	SM000011619	6	3444.00	98W	Nexen	XL Nexen NFera RU1 FR	225.0	50.0	R	17.0	/	98	W	\N	26	46
463	225/50R17 98Y XL Michelin Pilot Sport 5 FR	Шина Michelin 225/50R17 98Y XL Michelin Pilot Sport 5 FR розмір 225/50R17. Виробник: Іспанія	Іспанія	4424	Passenger	SM000003398	4	6195.00	98Y	Michelin	XL Michelin Pilot Sport 5 FR	225.0	50.0	R	17.0	/	98	Y	\N	13	187
464	225/55R17 101W XL Michelin Primacy 5 	Шина Michelin 225/55R17 101W XL Michelin Primacy 5  розмір 225/55R17. Виробник: Іспанія	Іспанія	4824	Passenger	SM000017761	4	6752.00	101W	Michelin	XL Michelin Primacy 5	225.0	55.0	R	17.0	/	101	W	\N	13	202
465	235/45R17 94H Roadstone N5000 Plus FR	Шина Roadstone 235/45R17 94H Roadstone N5000 Plus FR розмір 235/45R17. Виробник: Корея	Корея	323 	Passenger	SM000016163	7	2720.00	94H	Roadstone	N5000 Plus FR	235.0	45.0	R	17.0	/	94	H	\N	28	290
466	235/45R17 94W Kormoran Ultra High Performance FR	Шина Kormoran 235/45R17 94W Kormoran Ultra High Performance FR розмір 235/45R17. Виробник: Сербія	Сербія	1124	Passenger	SM000016963	4	2825.00	94W	Kormoran	Ultra High Performance FR	235.0	45.0	R	17.0	/	94	W	\N	22	159
467	235/55R17 103W XL Triangle EffeXSport TH202 FR	Шина Triangle 235/55R17 103W XL Triangle EffeXSport TH202 FR розмір 235/55R17. Виробник: Китай	Китай	224 	Passenger	SM000017025	4	3213.00	103W	Triangle	XL Triangle EffeXSport TH202 FR	235.0	55.0	R	17.0	/	103	W	\N	33	326
468	235/55R17 103Y XL Matador Hectorra 5 FR	Шина Matador 235/55R17 103Y XL Matador Hectorra 5 FR розмір 235/55R17. Виробник: Словаччина	Словаччина	5023	Passenger	SM000013966	8	4253.00	103Y	Matador	XL Matador Hectorra 5 FR	235.0	55.0	R	17.0	/	103	Y	\N	25	20
469	235/55R17 99H Goodyear EAGLE F1 ASYMMETRIC 5 	Шина Goodyear 235/55R17 99H Goodyear EAGLE F1 ASYMMETRIC 5  розмір 235/55R17. Виробник: Німеччина	Німеччина	4522	Passenger	SM000000037	2	4778.00	99H	Goodyear	EAGLE F1 ASYMMETRIC 5	235.0	55.0	R	17.0	/	99	H	\N	11	153
471	245/45R17 95H Roadstone N5000 Plus FR	Шина Roadstone 245/45R17 95H Roadstone N5000 Plus FR розмір 245/45R17. Виробник: Корея	Корея	323 	Passenger	SM000016166	6	3938.00	95H	Roadstone	N5000 Plus FR	245.0	45.0	R	17.0	/	95	H	\N	28	290
472	245/45R17 99W XL Kormoran Ultra High Performance FR	Шина Kormoran 245/45R17 99W XL Kormoran Ultra High Performance FR розмір 245/45R17. Виробник: Сербія	Сербія	1124	Passenger	SM000011858	4	3098.00	99W	Kormoran	XL Kormoran Ultra High Performance FR	245.0	45.0	R	17.0	/	99	W	\N	22	176
473	245/45R17 99Y XL Bridgestone Turanza 6 FR	Шина Bridgestone 245/45R17 99Y XL Bridgestone Turanza 6 FR розмір 245/45R17. Виробник: Угорщина	Угорщина	2324	Passenger	SM000017883	12	5649.00	99Y	Bridgestone	XL Bridgestone Turanza 6 FR	245.0	45.0	R	17.0	/	99	Y	\N	5	236
474	245/45R17 99Y XL Nexen NFera SU1 FR	Шина Nexen 245/45R17 99Y XL Nexen NFera SU1 FR розмір 245/45R17. Виробник: Корея	Корея	4423	Passenger	SM000003665	2	4326.00	99Y	Nexen	XL Nexen NFera SU1 FR	245.0	45.0	R	17.0	/	99	Y	\N	26	108
475	245/45R17 99Y XL Triangle EffeXSport TH202 FR	Шина Triangle 245/45R17 99Y XL Triangle EffeXSport TH202 FR розмір 245/45R17. Виробник: Китай	Китай	4223	Passenger	SM000013936	4	2861.00	99Y	Triangle	XL Triangle EffeXSport TH202 FR	245.0	45.0	R	17.0	/	99	Y	\N	33	326
476	245/45R17 99Y XL VREDESTEIN ULTRAC 	Шина VREDESTEIN 245/45R17 99Y XL VREDESTEIN ULTRAC  розмір 245/45R17. Виробник: Угорщина	Угорщина	424 	Passenger	SM000004437	8	4988.00	99Y	VREDESTEIN	XL VREDESTEIN ULTRAC	245.0	45.0	R	17.0	/	99	Y	\N	34	111
477	225/40R18 92Y XL Michelin Pilot Sport 4 * FR	Шина Michelin 225/40R18 92Y XL Michelin Pilot Sport 4 * FR розмір 225/40R18. Виробник: Франція	Франція	1724	Passenger	SM000013105	4	5397.00	92Y	Michelin	XL Michelin Pilot Sport 4 * FR	225.0	40.0	R	18.0	/	92	Y	\N	13	188
478	225/40R18 92Y XL VREDESTEIN ULTRAC PRO FR	Шина VREDESTEIN 225/40R18 92Y XL VREDESTEIN ULTRAC PRO FR розмір 225/40R18. Виробник: Нідерланди	Нідерланди	4523	Passenger	SM000004419	4	3728.00	92Y	VREDESTEIN	XL VREDESTEIN ULTRAC PRO FR	225.0	40.0	R	18.0	/	92	Y	\N	34	154
479	225/50R18 95V Michelin Primacy 3 FR	Шина Michelin 225/50R18 95V Michelin Primacy 3 FR розмір 225/50R18. Виробник: Іспанія	Іспанія	3623	Passenger	SM000015914	4	5355.00	95V	Michelin	Primacy 3 FR	225.0	50.0	R	18.0	/	95	V	\N	13	218
480	225/50R18 99W XL Michelin Primacy 4 * FR	Шина Michelin 225/50R18 99W XL Michelin Primacy 4 * FR розмір 225/50R18. Виробник: Іспанія	Іспанія	1224	Passenger	SM000009037	4	7823.00	99W	Michelin	XL Michelin Primacy 4 * FR	225.0	50.0	R	18.0	/	99	W	\N	13	221
481	225/50R18 99Y XL Sailun Atrezzo ZSR 2 FR	Шина Sailun 225/50R18 99Y XL Sailun Atrezzo ZSR 2 FR розмір 225/50R18. Виробник: Китай	Китай	5023	Passenger	SM000007012	4	3360.00	99Y	Sailun	XL Sailun Atrezzo ZSR 2 FR	225.0	50.0	R	18.0	/	99	Y	\N	29	142
482	225/50R18 99Y XL VREDESTEIN ULTRAC VORTI+ FR	Шина VREDESTEIN 225/50R18 99Y XL VREDESTEIN ULTRAC VORTI+ FR розмір 225/50R18. Виробник: Нідерланди	Нідерланди	4223	Passenger	SM000004430	12	5513.00	99Y	VREDESTEIN	XL VREDESTEIN ULTRAC VORTI+ FR	225.0	50.0	R	18.0	/	99	Y	\N	34	246
483	235/40R18 95Y XL Michelin Pilot Sport 5 FR	Шина Michelin 235/40R18 95Y XL Michelin Pilot Sport 5 FR розмір 235/40R18. Виробник: Іспанія	Іспанія	5023	Passenger	SM000013683	2	6017.00	95Y	Michelin	XL Michelin Pilot Sport 5 FR	235.0	40.0	R	18.0	/	95	Y	\N	13	187
484	235/40R18 95Y XL Sava Intensa UHP 2 FR	Шина Sava 235/40R18 95Y XL Sava Intensa UHP 2 FR розмір 235/40R18. Виробник: Німеччина	Німеччина	4021	Passenger	SM000003912	1	2835.00	95Y	Sava	XL Sava Intensa UHP 2 FR	235.0	40.0	R	18.0	/	95	Y	\N	30	190
485	235/45R18 98W XL GRENLANDER L-ZEAL 56 FR	Шина GRENLANDER 235/45R18 98W XL GRENLANDER L-ZEAL 56 FR розмір 235/45R18. Виробник: Китай	Китай	224 	Passenger	SM000016982	2	2620.00	98W	GRENLANDER	XL GRENLANDER L-ZEAL 56 FR	235.0	45.0	R	18.0	/	98	W	\N	18	228
486	235/45R18 98W XL Nexen NFera RU1 FR	Шина Nexen 235/45R18 98W XL Nexen NFera RU1 FR розмір 235/45R18. Виробник: Корея	Корея	4024	Passenger	SM000016264	8	4158.00	98W	Nexen	XL Nexen NFera RU1 FR	235.0	45.0	R	18.0	/	98	W	\N	26	46
487	235/45R18 98Y XL Firestone ROADHAWK 2 FR	Шина Firestone 235/45R18 98Y XL Firestone ROADHAWK 2 FR розмір 235/45R18. Виробник: Угорщина	Угорщина	2624	Passenger	SM000017886	12	4790.00	98Y	Firestone	XL Firestone ROADHAWK 2 FR	235.0	45.0	R	18.0	/	98	Y	\N	10	29
488	235/50R18 101W XL Kingrun Phantom K3000 FR	Шина Kingrun 235/50R18 101W XL Kingrun Phantom K3000 FR розмір 235/50R18. Виробник: Китай	Китай	119 	Passenger	SM000017016	1	2048.00	101W	Kingrun	XL Kingrun Phantom K3000 FR	235.0	50.0	R	18.0	/	101	W	\N	20	322
489	235/50R18 101Y XL Sailun Atrezzo ZSR 	Шина Sailun 235/50R18 101Y XL Sailun Atrezzo ZSR  розмір 235/50R18. Виробник: Китай	Китай	5120	Passenger	SM000017548	2	3045.00	101Y	Sailun	XL Sailun Atrezzo ZSR	235.0	50.0	R	18.0	/	101	Y	\N	29	259
490	235/50R18 101Y XL Sailun Atrezzo ZSR 2 FR	Шина Sailun 235/50R18 101Y XL Sailun Atrezzo ZSR 2 FR розмір 235/50R18. Виробник: Китай	Китай	4923	Passenger	SM000008438	2	3518.00	101Y	Sailun	XL Sailun Atrezzo ZSR 2 FR	235.0	50.0	R	18.0	/	101	Y	\N	29	142
491	235/50R18 101Y XL Sava Intensa UHP 2 FR	Шина Sava 235/50R18 101Y XL Sava Intensa UHP 2 FR розмір 235/50R18. Виробник: Німеччина	Німеччина	4021	Passenger	SM000005972	1	3675.00	101Y	Sava	XL Sava Intensa UHP 2 FR	235.0	50.0	R	18.0	/	101	Y	\N	30	190
492	235/50R18 101Y XL VREDESTEIN ULTRAC FR	Шина VREDESTEIN 235/50R18 101Y XL VREDESTEIN ULTRAC FR розмір 235/50R18. Виробник: Угорщина	Угорщина	724 	Passenger	SM000004452	4	5723.00	101Y	VREDESTEIN	XL VREDESTEIN ULTRAC FR	235.0	50.0	R	18.0	/	101	Y	\N	34	301
493	235/50R18 97V GRENLANDER L-ZEAL 56 FR	Шина GRENLANDER 235/50R18 97V GRENLANDER L-ZEAL 56 FR розмір 235/50R18. Виробник: Китай	Китай	124 	Passenger	SM000016984	2	2741.00	97V	GRENLANDER	L-ZEAL 56 FR	235.0	50.0	R	18.0	/	97	V	\N	18	296
494	245/40R18 93Y Michelin Pilot Sport 4 AO FR	Шина Michelin 245/40R18 93Y Michelin Pilot Sport 4 AO FR розмір 245/40R18. Виробник: Німеччина	Німеччина	1024	Passenger	SM000011539	2	6668.00	93Y	Michelin	Pilot Sport 4 AO FR	245.0	40.0	R	18.0	/	93	Y	\N	13	28
495	245/40R18 97W XL Roadstone NFera AU5 FR	Шина Roadstone 245/40R18 97W XL Roadstone NFera AU5 FR розмір 245/40R18. Виробник: Корея	Корея	1020	Passenger	SM000005748	1	2415.00	97W	Roadstone	XL Roadstone NFera AU5 FR	245.0	40.0	R	18.0	/	97	W	\N	28	9
496	245/40R18 97Y XL Michelin Primacy 4 MO FR	Шина Michelin 245/40R18 97Y XL Michelin Primacy 4 MO FR розмір 245/40R18. Виробник: Іспанія	Іспанія	1824	Passenger	SM000013946	4	6190.00	97Y	Michelin	XL Michelin Primacy 4 MO FR	245.0	40.0	R	18.0	/	97	Y	\N	13	280
497	245/45R18 100W XL Sailun Atrezzo ZSR ROF FR	Шина Sailun 245/45R18 100W XL Sailun Atrezzo ZSR ROF FR розмір 245/45R18. Виробник: Китай	Китай	4823	Passenger	SM000009213	4	3833.00	100W	Sailun	XL Sailun Atrezzo ZSR ROF FR	245.0	45.0	R	18.0	/	100	W	\N	29	115
498	245/45R18 100Y XL Michelin Pilot Sport 5 FR	Шина Michelin 245/45R18 100Y XL Michelin Pilot Sport 5 FR розмір 245/45R18. Виробник: Іспанія	Іспанія	5223	Passenger	SM000012494	4	7035.00	100Y	Michelin	XL Michelin Pilot Sport 5 FR	245.0	45.0	R	18.0	/	100	Y	\N	13	187
499	245/45R18 100Y XL Sailun Atrezzo ZSR 2 FR	Шина Sailun 245/45R18 100Y XL Sailun Atrezzo ZSR 2 FR розмір 245/45R18. Виробник: Китай	Китай	4723	Passenger	SM000009055	2	3413.00	100Y	Sailun	XL Sailun Atrezzo ZSR 2 FR	245.0	45.0	R	18.0	/	100	Y	\N	29	142
500	245/45R18 96W Continental ContiEcoContact 5 DEMO FR	Шина Continental 245/45R18 96W Continental ContiEcoContact 5 DEMO FR розмір 245/45R18. Виробник: Чехія	Чехія	2422	Passenger	SM000015730	2	5093.00	96W	Continental	ContiEcoContact 5 DEMO FR	245.0	45.0	R	18.0	/	96	W	\N	6	165
501	245/50R18 100Y Pirelli Cinturato P7 * FR	Шина Pirelli 245/50R18 100Y Pirelli Cinturato P7 * FR розмір 245/50R18. Виробник: Румунія	Румунія	4823	Passenger	SM000013299	4	6930.00	100Y	Pirelli	Cinturato P7 * FR	245.0	50.0	R	18.0	/	100	Y	\N	14	53
502	245/50R18 104Y XL Michelin Pilot Sport 5 FR	Шина Michelin 245/50R18 104Y XL Michelin Pilot Sport 5 FR розмір 245/50R18. Виробник: Італія	Італія	524 	Passenger	SM000014518	2	8279.00	104Y	Michelin	XL Michelin Pilot Sport 5 FR	245.0	50.0	R	18.0	/	104	Y	\N	13	187
503	255/45R18 103Y XL Hankook Ventus S1 evo3 K127 * 	Шина Hankook 255/45R18 103Y XL Hankook Ventus S1 evo3 K127 *  розмір 255/45R18. Виробник: Угорщина	Угорщина	422 	Passenger	SM000013139	4	5775.00	103Y	Hankook	XL Hankook Ventus S1 evo3 K127 *	255.0	45.0	R	18.0	/	103	Y	\N	12	266
504	255/45R18 103Y XL Sailun Atrezzo ZSR FR	Шина Sailun 255/45R18 103Y XL Sailun Atrezzo ZSR FR розмір 255/45R18. Виробник: Китай	Китай	4823	Passenger	SM000009056	4	3675.00	103Y	Sailun	XL Sailun Atrezzo ZSR FR	255.0	45.0	R	18.0	/	103	Y	\N	29	279
505	255/45R18 103Y XL VREDESTEIN ULTRAC SATIN FR	Шина VREDESTEIN 255/45R18 103Y XL VREDESTEIN ULTRAC SATIN FR розмір 255/45R18. Виробник: Нідерланди	Нідерланди	4023	Passenger	SM000004469	4	5670.00	103Y	VREDESTEIN	XL VREDESTEIN ULTRAC SATIN FR	255.0	45.0	R	18.0	/	103	Y	\N	34	86
506	225/40R19 93Y XL Matador Hectorra 5 FR	Шина Matador 225/40R19 93Y XL Matador Hectorra 5 FR розмір 225/40R19. Виробник: Словаччина	Словаччина	224 	Passenger	SM000017002	4	5145.00	93Y	Matador	XL Matador Hectorra 5 FR	225.0	40.0	R	19.0	/	93	Y	\N	25	20
507	225/45R19 96W XL Sava Intensa UHP 2 FR	Шина Sava 225/45R19 96W XL Sava Intensa UHP 2 FR розмір 225/45R19. Виробник: Німеччина	Німеччина	4922	Passenger	SM000013386	4	4337.00	96W	Sava	XL Sava Intensa UHP 2 FR	225.0	45.0	R	19.0	/	96	W	\N	30	190
508	225/45R19 96Y XL VREDESTEIN ULTRAC VORTI+ FR	Шина VREDESTEIN 225/45R19 96Y XL VREDESTEIN ULTRAC VORTI+ FR розмір 225/45R19. Виробник: Нідерланди	Нідерланди	5023	Passenger	SM000004453	4	5980.00	96Y	VREDESTEIN	XL VREDESTEIN ULTRAC VORTI+ FR	225.0	45.0	R	19.0	/	96	Y	\N	34	246
509	235/35R19 91Y XL Matador Hectorra 5 FR	Шина Matador 235/35R19 91Y XL Matador Hectorra 5 FR розмір 235/35R19. Виробник: Словаччина	Словаччина	5323	Passenger	SM000017003	4	3885.00	91Y	Matador	XL Matador Hectorra 5 FR	235.0	35.0	R	19.0	/	91	Y	\N	25	20
510	235/40R19 96Y XL Matador Hectorra 5 FR	Шина Matador 235/40R19 96Y XL Matador Hectorra 5 FR розмір 235/40R19. Виробник: Чехія	Чехія	2324	Passenger	SM000013601	8	4988.00	96Y	Matador	XL Matador Hectorra 5 FR	235.0	40.0	R	19.0	/	96	Y	\N	25	20
511	235/40R19 96Y XL Michelin Pilot Sport 4 FR	Шина Michelin 235/40R19 96Y XL Michelin Pilot Sport 4 FR розмір 235/40R19. Виробник: Іспанія	Іспанія	1724	Passenger	SM000003250	4	8925.00	96Y	Michelin	XL Michelin Pilot Sport 4 FR	235.0	40.0	R	19.0	/	96	Y	\N	13	27
512	235/40R19 96Y XL Sava Intensa UHP 2 FR	Шина Sava 235/40R19 96Y XL Sava Intensa UHP 2 FR розмір 235/40R19. Виробник: Німеччина	Німеччина	323 	Passenger	SM000013236	2	4463.00	96Y	Sava	XL Sava Intensa UHP 2 FR	235.0	40.0	R	19.0	/	96	Y	\N	30	190
513	235/45R19 99W XL GRENLANDER ENRI U08 FR	Шина GRENLANDER 235/45R19 99W XL GRENLANDER ENRI U08 FR розмір 235/45R19. Виробник: Китай	Китай	124 	Passenger	SM000016983	4	2830.00	99W	GRENLANDER	XL GRENLANDER ENRI U08 FR	235.0	45.0	R	19.0	/	99	W	\N	18	38
514	235/45R19 99Y XL Michelin Pilot Sport 5 FR	Шина Michelin 235/45R19 99Y XL Michelin Pilot Sport 5 FR розмір 235/45R19. Виробник: Німеччина	Німеччина	4823	Passenger	SM000013724	4	9975.00	99Y	Michelin	XL Michelin Pilot Sport 5 FR	235.0	45.0	R	19.0	/	99	Y	\N	13	187
515	235/45R19 99Y XL VREDESTEIN ULTRAC PRO FR	Шина VREDESTEIN 235/45R19 99Y XL VREDESTEIN ULTRAC PRO FR розмір 235/45R19. Виробник: Нідерланди	Нідерланди	624 	Passenger	SM000004472	4	7298.00	99Y	VREDESTEIN	XL VREDESTEIN ULTRAC PRO FR	235.0	45.0	R	19.0	/	99	Y	\N	34	154
516	245/40R19 98Y XL Michelin Pilot Sport 5 FR	Шина Michelin 245/40R19 98Y XL Michelin Pilot Sport 5 FR розмір 245/40R19. Виробник: Італія	Італія	2724	Passenger	SM000011549	2	8027.00	98Y	Michelin	XL Michelin Pilot Sport 5 FR	245.0	40.0	R	19.0	/	98	Y	\N	13	187
517	245/45R19 102Y XL Michelin Pilot Sport 3 T0 ACOUSTIC FR	Шина Michelin 245/45R19 102Y XL Michelin Pilot Sport 3 T0 ACOUSTIC FR розмір 245/45R19. Виробник: Угорщина	Угорщина	4621	Passenger	SM000009019	1	6825.00	102Y	Michelin	XL Michelin Pilot Sport 3 T0 ACOUSTIC FR	245.0	45.0	R	19.0	/	102	Y	\N	13	157
518	255/40R19 100Y XL Hankook Ventus S1 Evo2 K117B ROF FR	Шина Hankook 255/40R19 100Y XL Hankook Ventus S1 Evo2 K117B ROF FR розмір 255/40R19. Виробник: Угорщина	Угорщина	624 	Passenger	SM000016814	2	8080.00	100Y	Hankook	XL Hankook Ventus S1 Evo2 K117B ROF FR	255.0	40.0	R	19.0	/	100	Y	\N	12	75
519	255/40R19 100Y XL Michelin Pilot Sport 3 AO FR	Шина Michelin 255/40R19 100Y XL Michelin Pilot Sport 3 AO FR розмір 255/40R19. Виробник: Угорщина	Угорщина	4922	Passenger	SM000011499	2	7298.00	100Y	Michelin	XL Michelin Pilot Sport 3 AO FR	255.0	40.0	R	19.0	/	100	Y	\N	13	305
520	255/45R19 100V Nexen NFera RU1 FR	Шина Nexen 255/45R19 100V Nexen NFera RU1 FR розмір 255/45R19. Виробник: Корея	Корея	4423	Passenger	SM000016266	6	5912.00	100V	Nexen	NFera RU1 FR	255.0	45.0	R	19.0	/	100	V	\N	26	98
521	255/45R19 104Y XL VREDESTEIN ULTRAC VORTI+ FR	Шина VREDESTEIN 255/45R19 104Y XL VREDESTEIN ULTRAC VORTI+ FR розмір 255/45R19. Виробник: Нідерланди	Нідерланди	4723	Passenger	SM000004455	4	6615.00	104Y	VREDESTEIN	XL VREDESTEIN ULTRAC VORTI+ FR	255.0	45.0	R	19.0	/	104	Y	\N	34	246
522	275/35R19 100Y XL Michelin Pilot Sport 5 FR	Шина Michelin 275/35R19 100Y XL Michelin Pilot Sport 5 FR розмір 275/35R19. Виробник: Іспанія	Іспанія	1924	Passenger	SM000013199	2	12075.00	100Y	Michelin	XL Michelin Pilot Sport 5 FR	275.0	35.0	R	19.0	/	100	Y	\N	13	187
523	275/35R19 100Y XL Pirelli PZero PZ4 * FR	Шина Pirelli 275/35R19 100Y XL Pirelli PZero PZ4 * FR розмір 275/35R19. Виробник: Німеччина	Німеччина	523 	Passenger	SM000016459	2	10028.00	100Y	Pirelli	XL Pirelli PZero PZ4 * FR	275.0	35.0	R	19.0	/	100	Y	\N	14	92
524	245/40R20 99Y XL Michelin E Primacy * MO FR	Шина Michelin 245/40R20 99Y XL Michelin E Primacy * MO FR розмір 245/40R20. Виробник: Іспанія	Іспанія	3523	Passenger	SM000013920	4	9923.00	99Y	Michelin	XL Michelin E Primacy * MO FR	245.0	40.0	R	20.0	/	99	Y	\N	13	106
525	245/40R20 99Y XL Michelin Pilot Sport 4 ZP FR	Шина Michelin 245/40R20 99Y XL Michelin Pilot Sport 4 ZP FR розмір 245/40R20. Виробник: Італія	Італія	2324	Passenger	SM000015954	2	13230.00	99Y	Michelin	XL Michelin Pilot Sport 4 ZP FR	245.0	40.0	R	20.0	/	99	Y	\N	13	72
526	245/40R20 99Y XL Michelin Pilot Super Sport * FR	Шина Michelin 245/40R20 99Y XL Michelin Pilot Super Sport * FR розмір 245/40R20. Виробник: Франція	Франція	1824	Passenger	SM000013956	2	13125.00	99Y	Michelin	XL Michelin Pilot Super Sport * FR	245.0	40.0	R	20.0	/	99	Y	\N	13	315
527	255/40R20 101Y XL Michelin Pilot Sport 3 MO ACOUSTIC DOT 2022 FR	Шина Michelin 255/40R20 101Y XL Michelin Pilot Sport 3 MO ACOUSTIC DOT 2022 FR розмір 255/40R20. Виробник: Угорщина	Угорщина	5022	Passenger	SM000011494	2	9445.00	101Y	Michelin	XL Michelin Pilot Sport 3 MO ACOUSTIC DOT 2022 FR	255.0	40.0	R	20.0	/	101	Y	\N	13	324
528	275/35R20 102Y XL Michelin Pilot Super Sport * FR	Шина Michelin 275/35R20 102Y XL Michelin Pilot Super Sport * FR розмір 275/35R20. Виробник: Франція	Франція	924 	Passenger	SM000014290	2	13650.00	102Y	Michelin	XL Michelin Pilot Super Sport * FR	275.0	35.0	R	20.0	/	102	Y	\N	13	315
529	275/45R20 110Y XL Michelin Pilot Sport 5 FR	Шина Michelin 275/45R20 110Y XL Michelin Pilot Sport 5 FR розмір 275/45R20. Виробник: Угорщина	Угорщина	125 	Passenger	SM000014065	4	10148.00	110Y	Michelin	XL Michelin Pilot Sport 5 FR	275.0	45.0	R	20.0	/	110	Y	\N	13	187
530	285/35R20 104Y XL Michelin Pilot Sport 3 MO FR	Шина Michelin 285/35R20 104Y XL Michelin Pilot Sport 3 MO FR розмір 285/35R20. Виробник: Угорщина	Угорщина	924 	Passenger	SM000011504	2	14490.00	104Y	Michelin	XL Michelin Pilot Sport 3 MO FR	285.0	35.0	R	20.0	/	104	Y	\N	13	292
531	305/30R20 103Y XL Michelin Pilot Sport 4 S N0 FR	Шина Michelin 305/30R20 103Y XL Michelin Pilot Sport 4 S N0 FR розмір 305/30R20. Виробник: Угорщина	Угорщина	1824	Passenger	SM000016123	2	17745.00	103Y	Michelin	XL Michelin Pilot Sport 4 S N0 FR	305.0	30.0	R	20.0	/	103	Y	\N	13	143
532	255/45R21 106Y XL Michelin Pilot Sport EV NE0 FR	Шина Michelin 255/45R21 106Y XL Michelin Pilot Sport EV NE0 FR розмір 255/45R21. Виробник: Угорщина	Угорщина	3023	Passenger	SM000016127	2	14527.00	106Y	Michelin	XL Michelin Pilot Sport EV NE0 FR	255.0	45.0	R	21.0	/	106	Y	\N	13	203
533	295/35R21 107Y XL Pirelli PZero N1 FR	Шина Pirelli 295/35R21 107Y XL Pirelli PZero N1 FR розмір 295/35R21. Виробник: Великобританія	Великобританія	4023	Passenger	SM000016466	4	10868.00	107Y	Pirelli	XL Pirelli PZero N1 FR	295.0	35.0	R	21.0	/	107	Y	\N	14	274
534	205/70R15 96T Nexen WinGuard SUV 	Шина Nexen 205/70R15 96T Nexen WinGuard SUV  розмір 205/70R15. Виробник: Корея	Корея	2424	SUV/4x4/	SM000012044	12	2573.00	96T	Nexen	WinGuard SUV	205.0	70.0	R	15.0	/	96	T	\N	26	11
535	215/75R15 100S Triangle SnowLion TR777 	Шина Triangle 215/75R15 100S Triangle SnowLion TR777  розмір 215/75R15. Виробник: Китай	Китай	2024	SUV/4x4/	SM000012319	8	3465.00	100S	Triangle	SnowLion TR777	215.0	75.0	R	15.0	/	100	S	\N	33	285
536	235/75R15 109T XL Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 235/75R15 109T XL Nexen WinGuard Sport 2 WU7 SUV  розмір 235/75R15. Виробник: Корея	Корея	2124	SUV/4x4/	SM000017610	6	3439.00	109T	Nexen	XL Nexen WinGuard Sport 2 WU7 SUV	235.0	75.0	R	15.0	/	109	T	\N	26	65
537	215/65R16 102H XL TIGAR Winter SUV 	Шина TIGAR 215/65R16 102H XL TIGAR Winter SUV  розмір 215/65R16. Виробник: Сербія	Сербія	2524	SUV/4x4/	SM000006416	12	3465.00	102H	TIGAR	XL TIGAR Winter SUV	215.0	65.0	R	16.0	/	102	H	\N	31	255
538	215/65R16 98H Nokian Snowproof 2 SUV 	Шина Nokian 215/65R16 98H Nokian Snowproof 2 SUV  розмір 215/65R16. Виробник: Фінляндія	Фінляндія	1724	SUV/4x4/	SM000015495	12	4243.00	98H	Nokian	Snowproof 2 SUV	215.0	65.0	R	16.0	/	98	H	\N	15	149
539	215/65R16 98H Sailun Ice Blazer Alpine+ 	Шина Sailun 215/65R16 98H Sailun Ice Blazer Alpine+  розмір 215/65R16. Виробник: Китай	Китай	2224	SUV/4x4/	SM000008600	12	2987.00	98H	Sailun	Ice Blazer Alpine+	215.0	65.0	R	16.0	/	98	H	\N	29	304
540	215/65R16 98H Sava Eskimo HP 2 	Шина Sava 215/65R16 98H Sava Eskimo HP 2  розмір 215/65R16. Виробник: Польща	Польща	3824	SUV/4x4/	SM000017402	12	3518.00	98H	Sava	Eskimo HP 2	215.0	65.0	R	16.0	/	98	H	\N	30	318
541	215/70R16 100H TIGAR WINTER SUV 	Шина TIGAR 215/70R16 100H TIGAR WINTER SUV  розмір 215/70R16. Виробник: Сербія	Сербія	5023	SUV/4x4/	SM000017384	4	4184.00	100H	TIGAR	WINTER SUV	215.0	70.0	R	16.0	/	100	H	\N	31	309
542	215/70R16 104H XL Matador MP-93 Nordicca 	Шина Matador 215/70R16 104H XL Matador MP-93 Nordicca  розмір 215/70R16. Виробник: Словаччина	Словаччина	3223	SUV/4x4/	SM000002820	2	3801.00	104H	Matador	XL Matador MP-93 Nordicca	215.0	70.0	R	16.0	/	104	H	\N	25	60
543	225/70R16 103Q Nexen WinGuard ICE SUV 	Шина Nexen 225/70R16 103Q Nexen WinGuard ICE SUV  розмір 225/70R16. Виробник: Корея	Корея	2424	SUV/4x4/	SM000003627	4	4368.00	103Q	Nexen	WinGuard ICE SUV	225.0	70.0	R	16.0	/	103	Q	\N	26	117
544	225/75R16 104T Nexen WinGuard ICE SUV 	Шина Nexen 225/75R16 104T Nexen WinGuard ICE SUV  розмір 225/75R16. Виробник: Корея	Корея	1524	SUV/4x4/	SM000015748	8	4463.00	104T	Nexen	WinGuard ICE SUV	225.0	75.0	R	16.0	/	104	T	\N	26	117
545	235/75R16 108Q Nexen WinGuard Ice SUV 	Шина Nexen 235/75R16 108Q Nexen WinGuard Ice SUV  розмір 235/75R16. Виробник: Корея	Корея	2324	SUV/4x4/	SM000015747	12	4463.00	108Q	Nexen	WinGuard Ice SUV	235.0	75.0	R	16.0	/	108	Q	\N	26	321
546	245/70R16 107Q Nexen WinGuard ICE SUV 	Шина Nexen 245/70R16 107Q Nexen WinGuard ICE SUV  розмір 245/70R16. Виробник: Корея	Корея	2124	SUV/4x4/	SM000003464	2	4581.00	107Q	Nexen	WinGuard ICE SUV	245.0	70.0	R	16.0	/	107	Q	\N	26	117
547	265/60R18 114T XL Kormoran STUD SUV пш 	Шина Kormoran 265/60R18 114T XL Kormoran STUD SUV пш  розмір 265/60R18. Виробник: Сербія	Сербія	4222	SUV/4x4/	SM000014029	2	4043.00	114T	Kormoran	XL Kormoran STUD SUV пш	265.0	60.0	R	18.0	/	114	T	\N	22	251
548	265/70R16 112Q Nexen WinGuard ICE SUV 	Шина Nexen 265/70R16 112Q Nexen WinGuard ICE SUV  розмір 265/70R16. Виробник: Корея	Корея	1924	SUV/4x4/	SM000005503	2	6038.00	112Q	Nexen	WinGuard ICE SUV	265.0	70.0	R	16.0	/	112	Q	\N	26	117
549	265/70R16 112R Nokian Hakkapeliitta R5 SUV 	Шина Nokian 265/70R16 112R Nokian Hakkapeliitta R5 SUV  розмір 265/70R16. Виробник: Фінляндія	Фінляндія	5024	SUV/4x4/	SM000017779	12	6192.00	112R	Nokian	Hakkapeliitta R5 SUV	265.0	70.0	R	16.0	/	112	R	\N	15	215
550	265/70R16 112T Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 265/70R16 112T Nexen WinGuard Sport 2 WU7 SUV  розмір 265/70R16. Виробник: Корея	Корея	2124	SUV/4x4/	SM000003711	12	5322.00	112T	Nexen	WinGuard Sport 2 WU7 SUV	265.0	70.0	R	16.0	/	112	T	\N	26	224
551	265/70R16 112T Triangle SnowLink Trin PL02 	Шина Triangle 265/70R16 112T Triangle SnowLink Trin PL02  розмір 265/70R16. Виробник: Китай	Китай	2124	SUV/4x4/	SM000017409	4	4457.00	112T	Triangle	SnowLink Trin PL02	265.0	70.0	R	16.0	/	112	T	\N	33	105
552	LT245/75R16 120/116Q Nokian Hakkapeliitta LT3 пш 	Шина Nokian LT245/75R16 120/116Q Nokian Hakkapeliitta LT3 пш  розмір LT245/75R16. Виробник: Фінляндія	Фінляндія	4624	SUV/4x4/	SM000012435	4	7778.00	120/116Q	Nokian	Hakkapeliitta LT3 пш	245.0	75.0	R	16.0	/	120/116	Q	LT	15	234
553	LT245/75R16 120/116R Nexen WinGuard WinSpike 3 пш 	Шина Nexen LT245/75R16 120/116R Nexen WinGuard WinSpike 3 пш  розмір LT245/75R16. Виробник: Корея	Корея	1724	SUV/4x4/	SM000003632	12	6241.00	120/116R	Nexen	WinGuard WinSpike 3 пш	245.0	75.0	R	16.0	/	120/116	R	LT	26	18
554	215/60R17 96H WESTLAKE SW608 Snowmaster 	Шина WESTLAKE 215/60R17 96H WESTLAKE SW608 Snowmaster  розмір 215/60R17. Виробник: Китай	Китай	2724	SUV/4x4/	SM000017435	2	2615.00	96H	WESTLAKE	SW608 Snowmaster	215.0	60.0	R	17.0	/	96	H	\N	35	33
555	225/60R17 103H XL Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 225/60R17 103H XL Nexen WinGuard Sport 2 WU7 SUV  розмір 225/60R17. Виробник: Корея	Корея	2323	SUV/4x4/	SM000008661	6	4127.00	103H	Nexen	XL Nexen WinGuard Sport 2 WU7 SUV	225.0	60.0	R	17.0	/	103	H	\N	26	65
556	225/65R17 102T Nexen WinGuard WinSpike 3 пш 	Шина Nexen 225/65R17 102T Nexen WinGuard WinSpike 3 пш  розмір 225/65R17. Виробник: Корея	Корея	1523	SUV/4x4/	SM000017563	4	4211.00	102T	Nexen	WinGuard WinSpike 3 пш	225.0	65.0	R	17.0	/	102	T	\N	26	18
557	225/65R17 106T XL Goodyear UltraGrip ARCTIC 2 SUV пш 	Шина Goodyear 225/65R17 106T XL Goodyear UltraGrip ARCTIC 2 SUV пш  розмір 225/65R17. Виробник: Німеччина	Німеччина	1723	SUV/4x4/	SM000014908	4	6615.00	106T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV пш	225.0	65.0	R	17.0	/	106	T	\N	11	88
558	225/65R17 106T XL Goodyear UltraGrip ARCTIC 2 SUV шип 	Шина Goodyear 225/65R17 106T XL Goodyear UltraGrip ARCTIC 2 SUV шип  розмір 225/65R17. Виробник: Німеччина	Німеччина	1723	SUV/4x4/	SM000006867	12	6458.00	106T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV шип	225.0	65.0	R	17.0	/	106	T	\N	11	180
559	225/65R17 106T XL Goodyear UltraGrip ICE 3 	Шина Goodyear 225/65R17 106T XL Goodyear UltraGrip ICE 3  розмір 225/65R17. Виробник: Німеччина	Німеччина	3023	SUV/4x4/	SM000015022	10	6510.00	106T	Goodyear	XL Goodyear UltraGrip ICE 3	225.0	65.0	R	17.0	/	106	T	\N	11	207
560	235/55R17 103H XL Nokian Snowproof 2 SUV 	Шина Nokian 235/55R17 103H XL Nokian Snowproof 2 SUV  розмір 235/55R17. Виробник: Фінляндія	Фінляндія	2023	SUV/4x4/	SM000015937	2	5584.00	103H	Nokian	XL Nokian Snowproof 2 SUV	235.0	55.0	R	17.0	/	103	H	\N	15	113
561	235/60R17 102T Nexen WinGuard WinSpike 3 пш 	Шина Nexen 235/60R17 102T Nexen WinGuard WinSpike 3 пш  розмір 235/60R17. Виробник: Корея	Корея	1624	SUV/4x4/	SM000017622	4	4358.00	102T	Nexen	WinGuard WinSpike 3 пш	235.0	60.0	R	17.0	/	102	T	\N	26	18
562	245/65R17 107H Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 245/65R17 107H Nexen WinGuard Sport 2 WU7 SUV  розмір 245/65R17. Виробник: Корея	Корея	1524	SUV/4x4/	SM000003713	8	4998.00	107H	Nexen	WinGuard Sport 2 WU7 SUV	245.0	65.0	R	17.0	/	107	H	\N	26	224
563	245/65R17 107T Hankook Winter I*Cept iZ3 X W636A 	Шина Hankook 245/65R17 107T Hankook Winter I*Cept iZ3 X W636A  розмір 245/65R17. Виробник: Корея	Корея	2324	SUV/4x4/	SM000017498	2	5444.00	107T	Hankook	Winter I*Cept iZ3 X W636A	245.0	65.0	R	17.0	/	107	T	\N	12	204
564	245/70R17 110R Nokian Hakkapeliitta R5 SUV 	Шина Nokian 245/70R17 110R Nokian Hakkapeliitta R5 SUV  розмір 245/70R17. Виробник: Фінляндія	Фінляндія	324 	SUV/4x4/	SM000017485	4	6693.00	110R	Nokian	Hakkapeliitta R5 SUV	245.0	70.0	R	17.0	/	110	R	\N	15	215
565	265/65R17 112H Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 265/65R17 112H Nexen WinGuard Sport 2 WU7 SUV  розмір 265/65R17. Виробник: Корея	Корея	1424	SUV/4x4/	SM000003552	10	5513.00	112H	Nexen	WinGuard Sport 2 WU7 SUV	265.0	65.0	R	17.0	/	112	H	\N	26	224
566	265/65R17 116H XL Nokian Snowproof 2 SUV 	Шина Nokian 265/65R17 116H XL Nokian Snowproof 2 SUV  розмір 265/65R17. Виробник: Фінляндія	Фінляндія	2424	SUV/4x4/	SM000017429	8	7262.00	116H	Nokian	XL Nokian Snowproof 2 SUV	265.0	65.0	R	17.0	/	116	H	\N	15	113
567	265/65R17 116H XL TIGAR WINTER SUV 	Шина TIGAR 265/65R17 116H XL TIGAR WINTER SUV  розмір 265/65R17. Виробник: Сербія	Сербія	3324	SUV/4x4/	SM000000194	4	5513.00	116H	TIGAR	XL TIGAR WINTER SUV	265.0	65.0	R	17.0	/	116	H	\N	31	225
568	LT245/70R17 119/116Q Nokian Hakkapeliitta LT3 шип 	Шина Nokian LT245/70R17 119/116Q Nokian Hakkapeliitta LT3 шип  розмір LT245/70R17. Виробник: Фінляндія	Фінляндія	4824	SUV/4x4/	SM000017645	8	9310.00	119/116Q	Nokian	Hakkapeliitta LT3 шип	245.0	70.0	R	17.0	/	119/116	Q	LT	15	114
569	LT245/75R17 121/118Q Nokian Hakkapeliitta LT3 пш 	Шина Nokian LT245/75R17 121/118Q Nokian Hakkapeliitta LT3 пш  розмір LT245/75R17. Виробник: Фінляндія	Фінляндія	4724	SUV/4x4/	SM000005337	4	8256.00	121/118Q	Nokian	Hakkapeliitta LT3 пш	245.0	75.0	R	17.0	/	121/118	Q	LT	15	234
570	LT265/70R17 121/118R Nexen WinGuard WinSpike 3 пш 	Шина Nexen LT265/70R17 121/118R Nexen WinGuard WinSpike 3 пш  розмір LT265/70R17. Виробник: Корея	Корея	1924	SUV/4x4/	SM000017605	4	5954.00	121/118R	Nexen	WinGuard WinSpike 3 пш	265.0	70.0	R	17.0	/	121/118	R	LT	26	18
571	215/55R18 99R XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 215/55R18 99R XL Nokian Hakkapeliitta R5 SUV FR розмір 215/55R18. Виробник: Фінляндія	Фінляндія	3624	SUV/4x4/	SM000006692	12	7165.00	99R	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	215.0	55.0	R	18.0	/	99	R	\N	15	156
572	215/55R18 99R XL Triangle SnowLink Trin PL01 FR	Шина Triangle 215/55R18 99R XL Triangle SnowLink Trin PL01 FR розмір 215/55R18. Виробник: Китай	Китай	3524	SUV/4x4/	SM000012315	4	3533.00	99R	Triangle	XL Triangle SnowLink Trin PL01 FR	215.0	55.0	R	18.0	/	99	R	\N	33	81
573	215/55R18 99T XL Goodyear UltraGrip ARCTIC 2 шип 	Шина Goodyear 215/55R18 99T XL Goodyear UltraGrip ARCTIC 2 шип  розмір 215/55R18. Виробник: Німеччина	Німеччина	4622	SUV/4x4/	SM000002237	2	5985.00	99T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 шип	215.0	55.0	R	18.0	/	99	T	\N	11	233
574	225/55R18 98T Nexen WinGuard WinSpike 3 пш 	Шина Nexen 225/55R18 98T Nexen WinGuard WinSpike 3 пш  розмір 225/55R18. Виробник: Корея	Корея	2524	SUV/4x4/	SM000014856	12	4358.00	98T	Nexen	WinGuard WinSpike 3 пш	225.0	55.0	R	18.0	/	98	T	\N	26	18
575	225/60R18 100H Toyo Observe GSi6 SUV FR	Шина Toyo 225/60R18 100H Toyo Observe GSi6 SUV FR розмір 225/60R18. Виробник: Японія	Японія	3623	SUV/4x4/	SM000008674	1	6284.00	100H	Toyo	Observe GSi6 SUV FR	225.0	60.0	R	18.0	/	100	H	\N	32	17
576	225/60R18 100T Nexen WinGuard WinSpike 3 пш FR	Шина Nexen 225/60R18 100T Nexen WinGuard WinSpike 3 пш FR розмір 225/60R18. Виробник: Корея	Корея	2024	SUV/4x4/	SM000017597	4	5093.00	100T	Nexen	WinGuard WinSpike 3 пш FR	225.0	60.0	R	18.0	/	100	T	\N	26	211
577	235/55R18 104V XL Triangle SnowLink Trin PL02 	Шина Triangle 235/55R18 104V XL Triangle SnowLink Trin PL02  розмір 235/55R18. Виробник: Китай	Китай	3524	SUV/4x4/	SM000012218	0	3806.00	104V	Triangle	XL Triangle SnowLink Trin PL02	235.0	55.0	R	18.0	/	104	V	\N	33	170
578	235/65R18 106T Nexen WinGuard WinSpike 3 пш 	Шина Nexen 235/65R18 106T Nexen WinGuard WinSpike 3 пш  розмір 235/65R18. Виробник: Корея	Корея	2024	SUV/4x4/	SM000014889	10	5292.00	106T	Nexen	WinGuard WinSpike 3 пш	235.0	65.0	R	18.0	/	106	T	\N	26	18
579	235/65R18 110H XL Continental WinterContact TS 870 P FR	Шина Continental 235/65R18 110H XL Continental WinterContact TS 870 P FR розмір 235/65R18. Виробник: Чехія	Чехія	2524	SUV/4x4/	SM000017453	4	8663.00	110H	Continental	XL Continental WinterContact TS 870 P FR	235.0	65.0	R	18.0	/	110	H	\N	6	284
580	235/65R18 110T XL Triangle SnowLink Trin PL01 	Шина Triangle 235/65R18 110T XL Triangle SnowLink Trin PL01  розмір 235/65R18. Виробник: Китай	Китай	3924	SUV/4x4/	SM000012101	4	3969.00	110T	Triangle	XL Triangle SnowLink Trin PL01	235.0	65.0	R	18.0	/	110	T	\N	33	99
581	245/60R18 105T Nexen WinGuard WinSpike 3 пш 	Шина Nexen 245/60R18 105T Nexen WinGuard WinSpike 3 пш  розмір 245/60R18. Виробник: Корея	Корея	1824	SUV/4x4/	SM000017495	12	5513.00	105T	Nexen	WinGuard WinSpike 3 пш	245.0	60.0	R	18.0	/	105	T	\N	26	18
582	255/55R18 109V XL Matador MP-93 Nordicca FR	Шина Matador 255/55R18 109V XL Matador MP-93 Nordicca FR розмір 255/55R18. Виробник: Німеччина	Німеччина	4624	SUV/4x4/	SM000000871	4	4975.00	109V	Matador	XL Matador MP-93 Nordicca FR	255.0	55.0	R	18.0	/	109	V	\N	25	310
583	255/55R18 109V XL Nexen WinGuard Sport 2 WU7 SUV FR	Шина Nexen 255/55R18 109V XL Nexen WinGuard Sport 2 WU7 SUV FR розмір 255/55R18. Виробник: Корея	Корея	1524	SUV/4x4/	SM000003559	4	4804.00	109V	Nexen	XL Nexen WinGuard Sport 2 WU7 SUV FR	255.0	55.0	R	18.0	/	109	V	\N	26	2
584	255/60R18 112H XL Nexen WinGuard Sport 2 WU7 SUV 	Шина Nexen 255/60R18 112H XL Nexen WinGuard Sport 2 WU7 SUV  розмір 255/60R18. Виробник: Корея	Корея	2024	SUV/4x4/	SM000003550	4	5355.00	112H	Nexen	XL Nexen WinGuard Sport 2 WU7 SUV	255.0	60.0	R	18.0	/	112	H	\N	26	65
585	255/60R18 112T XL Goodyear UltraGrip ARCTIC 2 SUV пш 	Шина Goodyear 255/60R18 112T XL Goodyear UltraGrip ARCTIC 2 SUV пш  розмір 255/60R18. Виробник: Польща	Польща	3122	SUV/4x4/	SM000014919	4	7875.00	112T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV пш	255.0	60.0	R	18.0	/	112	T	\N	11	88
586	255/60R18 112T XL Goodyear UltraGrip ARCTIC 2 SUV шип 	Шина Goodyear 255/60R18 112T XL Goodyear UltraGrip ARCTIC 2 SUV шип  розмір 255/60R18. Виробник: Німеччина	Німеччина	3122	SUV/4x4/	SM000009247	12	7712.00	112T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV шип	255.0	60.0	R	18.0	/	112	T	\N	11	180
587	255/70R18 116V XL Michelin Pilot Alpin 5 SUV 	Шина Michelin 255/70R18 116V XL Michelin Pilot Alpin 5 SUV  розмір 255/70R18. Виробник: Польща	Польща	3724	SUV/4x4/	SM000014204	8	9702.00	116V	Michelin	XL Michelin Pilot Alpin 5 SUV	255.0	70.0	R	18.0	/	116	V	\N	13	16
588	265/60R18 114H XL Nokian Snowproof 2 SUV 	Шина Nokian 265/60R18 114H XL Nokian Snowproof 2 SUV  розмір 265/60R18. Виробник: Фінляндія	Фінляндія	2124	SUV/4x4/	SM000005852	8	7487.00	114H	Nokian	XL Nokian Snowproof 2 SUV	265.0	60.0	R	18.0	/	114	H	\N	15	113
589	265/60R18 114H XL TIGAR WINTER SUV 	Шина TIGAR 265/60R18 114H XL TIGAR WINTER SUV  розмір 265/60R18. Виробник: Сербія	Сербія	3324	SUV/4x4/	SM000000193	8	5313.00	114H	TIGAR	XL TIGAR WINTER SUV	265.0	60.0	R	18.0	/	114	H	\N	31	225
590	275/65R18 116T Michelin X-Ice Snow SUV FR	Шина Michelin 275/65R18 116T Michelin X-Ice Snow SUV FR розмір 275/65R18. Виробник: Канада	Канада	2924	SUV/4x4/	SM000014874	4	10395.00	116T	Michelin	X-Ice Snow SUV FR	275.0	65.0	R	18.0	/	116	T	\N	13	189
591	285/60R18 116Q Nexen WinGuard ICE SUV 	Шина Nexen 285/60R18 116Q Nexen WinGuard ICE SUV  розмір 285/60R18. Виробник: Корея	Корея	2924	SUV/4x4/	SM000003465	12	6069.00	116Q	Nexen	WinGuard ICE SUV	285.0	60.0	R	18.0	/	116	Q	\N	26	117
592	285/60R18 120H XL Kapsen SnowShoes AW33 DEMO 	Шина Kapsen 285/60R18 120H XL Kapsen SnowShoes AW33 DEMO  розмір 285/60R18. Виробник: Китай	Китай	2522	SUV/4x4/	SM000012117	6	3024.00	120H	Kapsen	XL Kapsen SnowShoes AW33 DEMO	285.0	60.0	R	18.0	/	120	H	\N	19	319
593	225/55R19 99Q Toyo Observe GSi5 FR	Шина Toyo 225/55R19 99Q Toyo Observe GSi5 FR розмір 225/55R19. Виробник: Японія	Японія	1519	SUV/4x4/	SM000004057	1	3150.00	99Q	Toyo	Observe GSi5 FR	225.0	55.0	R	19.0	/	99	Q	\N	32	67
594	235/50R19 103V XL Firestone WINTERHAWK 4 FR	Шина Firestone 235/50R19 103V XL Firestone WINTERHAWK 4 FR розмір 235/50R19. Виробник: Іспанія	Іспанія	2022	SUV/4x4/	SM000016224	2	5513.00	103V	Firestone	XL Firestone WINTERHAWK 4 FR	235.0	50.0	R	19.0	/	103	V	\N	10	311
595	235/55R19 105V XL Matador MP-93 Nordicca FR	Шина Matador 235/55R19 105V XL Matador MP-93 Nordicca FR розмір 235/55R19. Виробник: Франція	Франція	3624	SUV/4x4/	SM000002866	1	6143.00	105V	Matador	XL Matador MP-93 Nordicca FR	235.0	55.0	R	19.0	/	105	V	\N	25	310
596	235/55R19 105V XL Nexen WinGuard Sport 2 WU7 FR	Шина Nexen 235/55R19 105V XL Nexen WinGuard Sport 2 WU7 FR розмір 235/55R19. Виробник: Корея	Корея	3224	SUV/4x4/	SM000003645	6	7135.00	105V	Nexen	XL Nexen WinGuard Sport 2 WU7 FR	235.0	55.0	R	19.0	/	105	V	\N	26	107
597	245/55R19 107R XL Nokian Hakkapeliitta R5 SUV 	Шина Nokian 245/55R19 107R XL Nokian Hakkapeliitta R5 SUV  розмір 245/55R19. Виробник: Фінляндія	Фінляндія	824 	SUV/4x4/	SM000017488	12	9638.00	107R	Nokian	XL Nokian Hakkapeliitta R5 SUV	245.0	55.0	R	19.0	/	107	R	\N	15	223
598	245/55R19 107T XL Goodyear UltraGrip ARCTIC 2 SUV шип 	Шина Goodyear 245/55R19 107T XL Goodyear UltraGrip ARCTIC 2 SUV шип  розмір 245/55R19. Виробник: Німеччина	Німеччина	2122	SUV/4x4/	SM000002407	6	6143.00	107T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV шип	245.0	55.0	R	19.0	/	107	T	\N	11	180
599	255/45R19 104V XL Nokian Snowproof 2 SUV FR	Шина Nokian 255/45R19 104V XL Nokian Snowproof 2 SUV FR розмір 255/45R19. Виробник: Фінляндія	Фінляндія	2824	SUV/4x4/	SM000015942	12	8845.00	104V	Nokian	XL Nokian Snowproof 2 SUV FR	255.0	45.0	R	19.0	/	104	V	\N	15	295
600	255/50R19 107T XL Goodyear UltraGrip ARCTIC 2 SUV шип FR	Шина Goodyear 255/50R19 107T XL Goodyear UltraGrip ARCTIC 2 SUV шип FR розмір 255/50R19. Виробник: Німеччина	Німеччина	3123	SUV/4x4/	SM000002425	2	9555.00	107T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV шип FR	255.0	50.0	R	19.0	/	107	T	\N	11	198
601	255/50R19 107V XL Goodyear UltraGrip Performance SUV G1 Б/У 5 мм 	Шина Goodyear 255/50R19 107V XL Goodyear UltraGrip Performance SUV G1 Б/У 5 мм  розмір 255/50R19. Виробник: Німеччина	Німеччина	1717	SUV/4x4/	SM000002418	1	1680.00	107V	Goodyear	XL Goodyear UltraGrip Performance SUV G1 Б/У 5 мм	255.0	50.0	R	19.0	/	107	V	\N	11	121
602	255/50R19 107V XL Kleber Krisalp HP3 SUV 	Шина Kleber 255/50R19 107V XL Kleber Krisalp HP3 SUV  розмір 255/50R19. Виробник: Румунія	Румунія	2024	SUV/4x4/	SM000017392	4	6505.00	107V	Kleber	XL Kleber Krisalp HP3 SUV	255.0	50.0	R	19.0	/	107	V	\N	21	298
603	235/50R20 104V XL Nokian Snowproof 2 SUV 	Шина Nokian 235/50R20 104V XL Nokian Snowproof 2 SUV  розмір 235/50R20. Виробник: Фінляндія	Фінляндія	2524	SUV/4x4/	SM000015865	12	9594.00	104V	Nokian	XL Nokian Snowproof 2 SUV	235.0	50.0	R	20.0	/	104	V	\N	15	113
604	245/50R20 102V Nexen WinGuard Sport 2 WU7 SUV FR	Шина Nexen 245/50R20 102V Nexen WinGuard Sport 2 WU7 SUV FR розмір 245/50R20. Виробник: Корея	Корея	2224	SUV/4x4/	SM000006546	11	7959.00	102V	Nexen	WinGuard Sport 2 WU7 SUV FR	245.0	50.0	R	20.0	/	102	V	\N	26	129
605	255/55R20 110T XL Goodyear UltraGrip ARCTIC 2 SUV шип 	Шина Goodyear 255/55R20 110T XL Goodyear UltraGrip ARCTIC 2 SUV шип  розмір 255/55R20. Виробник: Німеччина	Німеччина	3022	SUV/4x4/	SM000015027	4	8285.00	110T	Goodyear	XL Goodyear UltraGrip ARCTIC 2 SUV шип	255.0	55.0	R	20.0	/	110	T	\N	11	180
606	265/50R20 111T XL Nexen WinGuard ICE SUV 	Шина Nexen 265/50R20 111T XL Nexen WinGuard ICE SUV  розмір 265/50R20. Виробник: Корея	Корея	2424	SUV/4x4/	SM000015815	4	7082.00	111T	Nexen	XL Nexen WinGuard ICE SUV	265.0	50.0	R	20.0	/	111	T	\N	26	205
607	265/50R20 111V XL Kleber Krisalp HP3 SUV 	Шина Kleber 265/50R20 111V XL Kleber Krisalp HP3 SUV  розмір 265/50R20. Виробник: Румунія	Румунія	2324	SUV/4x4/	SM000017395	8	9749.00	111V	Kleber	XL Kleber Krisalp HP3 SUV	265.0	50.0	R	20.0	/	111	V	\N	21	298
608	265/55R20 113H XL Michelin X-Ice Snow SUV FR	Шина Michelin 265/55R20 113H XL Michelin X-Ice Snow SUV FR розмір 265/55R20. Виробник: Китай	Китай	2224	SUV/4x4/	SM000003381	12	11057.00	113H	Michelin	XL Michelin X-Ice Snow SUV FR	265.0	55.0	R	20.0	/	113	H	\N	13	34
609	265/55R20 113T XL Michelin X-Ice North 4 SUV шип FR	Шина Michelin 265/55R20 113T XL Michelin X-Ice North 4 SUV шип FR розмір 265/55R20. Виробник: Угорщина	Угорщина	3024	SUV/4x4/	SM000009279	4	11844.00	113T	Michelin	XL Michelin X-Ice North 4 SUV шип FR	265.0	55.0	R	20.0	/	113	T	\N	13	128
610	275/40R20 106V XL Kormoran SNOW SUV FR	Шина Kormoran 275/40R20 106V XL Kormoran SNOW SUV FR розмір 275/40R20. Виробник: Сербія	Сербія	3122	SUV/4x4/	SM000010822	2	3775.00	106V	Kormoran	XL Kormoran SNOW SUV FR	275.0	40.0	R	20.0	/	106	V	\N	22	89
611	275/40R20 106V XL TIGAR WINTER SUV FR	Шина TIGAR 275/40R20 106V XL TIGAR WINTER SUV FR розмір 275/40R20. Виробник: Сербія	Сербія	3722	SUV/4x4/	SM000000195	4	5706.00	106V	TIGAR	XL TIGAR WINTER SUV FR	275.0	40.0	R	20.0	/	106	V	\N	31	59
612	275/40R20 106W XL Pirelli Winter Sottozero 2 FR	Шина Pirelli 275/40R20 106W XL Pirelli Winter Sottozero 2 FR розмір 275/40R20. Виробник: Німеччина	Німеччина	3512	SUV/4x4/	SM000003810	1	8400.00	106W	Pirelli	XL Pirelli Winter Sottozero 2 FR	275.0	40.0	R	20.0	/	106	W	\N	14	175
613	275/45R20 110T XL Nexen WinGuard WinSpike 3 пш 	Шина Nexen 275/45R20 110T XL Nexen WinGuard WinSpike 3 пш  розмір 275/45R20. Виробник: Корея	Корея	2724	SUV/4x4/	SM000017621	4	6956.00	110T	Nexen	XL Nexen WinGuard WinSpike 3 пш	275.0	45.0	R	20.0	/	110	T	\N	26	213
614	275/45R20 110W XL Triangle SnowLink Trin PL02 FR	Шина Triangle 275/45R20 110W XL Triangle SnowLink Trin PL02 FR розмір 275/45R20. Виробник: Китай	Китай	4124	SUV/4x4/	SM000012115	2	4872.00	110W	Triangle	XL Triangle SnowLink Trin PL02 FR	275.0	45.0	R	20.0	/	110	W	\N	33	134
615	275/50R20 113R XL Nokian Hakkapeliitta R5 SUV 	Шина Nokian 275/50R20 113R XL Nokian Hakkapeliitta R5 SUV  розмір 275/50R20. Виробник: Фінляндія	Фінляндія	824 	SUV/4x4/	SM000006561	12	11333.00	113R	Nokian	XL Nokian Hakkapeliitta R5 SUV	275.0	50.0	R	20.0	/	113	R	\N	15	223
616	275/50R20 113V XL Kleber Krisalp HP3 SUV 	Шина Kleber 275/50R20 113V XL Kleber Krisalp HP3 SUV  розмір 275/50R20. Виробник: Румунія	Румунія	2724	SUV/4x4/	SM000017393	4	9109.00	113V	Kleber	XL Kleber Krisalp HP3 SUV	275.0	50.0	R	20.0	/	113	V	\N	21	298
617	275/50R20 113V XL Nokian Snowproof 2 SUV 	Шина Nokian 275/50R20 113V XL Nokian Snowproof 2 SUV  розмір 275/50R20. Виробник: Фінляндія	Фінляндія	3224	SUV/4x4/	SM000017430	8	9687.00	113V	Nokian	XL Nokian Snowproof 2 SUV	275.0	50.0	R	20.0	/	113	V	\N	15	113
618	235/45R21 101V XL Michelin Pilot Alpin 5 SUV FR	Шина Michelin 235/45R21 101V XL Michelin Pilot Alpin 5 SUV FR розмір 235/45R21. Виробник: Угорщина	Угорщина	2024	SUV/4x4/	SM000016434	2	15015.00	101V	Michelin	XL Michelin Pilot Alpin 5 SUV FR	235.0	45.0	R	21.0	/	101	V	\N	13	70
619	255/45R21 106V XL Michelin Pilot Alpin 5 SUV NE0 FR	Шина Michelin 255/45R21 106V XL Michelin Pilot Alpin 5 SUV NE0 FR розмір 255/45R21. Виробник: Угорщина	Угорщина	3723	SUV/4x4/	SM000016658	2	14994.00	106V	Michelin	XL Michelin Pilot Alpin 5 SUV NE0 FR	255.0	45.0	R	21.0	/	106	V	\N	13	186
620	275/40R21 107T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 275/40R21 107T XL Nokian Hakkapeliitta R5 SUV FR розмір 275/40R21. Виробник: Фінляндія	Фінляндія	4524	SUV/4x4/	SM000017550	12	11661.00	107T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	275.0	40.0	R	21.0	/	107	T	\N	15	156
621	275/45R21 110T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 275/45R21 110T XL Nokian Hakkapeliitta R5 SUV FR розмір 275/45R21. Виробник: Фінляндія	Фінляндія	4324	SUV/4x4/	SM000017553	12	12387.00	110T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	275.0	45.0	R	21.0	/	110	T	\N	15	156
622	275/50R21 113V XL Continental WinterContact TS 860 S FR	Шина Continental 275/50R21 113V XL Continental WinterContact TS 860 S FR розмір 275/50R21. Виробник: Німеччина	Німеччина	324 	SUV/4x4/	SM000005554	4	15488.00	113V	Continental	XL Continental WinterContact TS 860 S FR	275.0	50.0	R	21.0	/	113	V	\N	6	262
623	285/35R21 105W XL Michelin Pilot Alpin 5 SUV FR	Шина Michelin 285/35R21 105W XL Michelin Pilot Alpin 5 SUV FR розмір 285/35R21. Виробник: Франція	Франція	3124	SUV/4x4/	SM000016773	4	19058.00	105W	Michelin	XL Michelin Pilot Alpin 5 SUV FR	285.0	35.0	R	21.0	/	105	W	\N	13	70
624	285/45R21 113T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 285/45R21 113T XL Nokian Hakkapeliitta R5 SUV FR розмір 285/45R21. Виробник: Фінляндія	Фінляндія	4624	SUV/4x4/	SM000000182	12	11904.00	113T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	285.0	45.0	R	21.0	/	113	T	\N	15	156
625	305/30R21 104V XL Michelin Alpin 5 NA2 FR	Шина Michelin 305/30R21 104V XL Michelin Alpin 5 NA2 FR розмір 305/30R21. Виробник: Франція	Франція	4024	SUV/4x4/	SM000016706	2	24570.00	104V	Michelin	XL Michelin Alpin 5 NA2 FR	305.0	30.0	R	21.0	/	104	V	\N	13	162
626	315/35R21 111T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 315/35R21 111T XL Nokian Hakkapeliitta R5 SUV FR розмір 315/35R21. Виробник: Фінляндія	Фінляндія	3424	SUV/4x4/	SM000006691	12	11886.00	111T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	315.0	35.0	R	21.0	/	111	T	\N	15	156
627	315/40R21 115T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 315/40R21 115T XL Nokian Hakkapeliitta R5 SUV FR розмір 315/40R21. Виробник: Фінляндія	Фінляндія	3524	SUV/4x4/	SM000008808	12	12125.00	115T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	315.0	40.0	R	21.0	/	115	T	\N	15	156
628	265/50R22 112H XL Michelin X-Ice Snow SUV FR	Шина Michelin 265/50R22 112H XL Michelin X-Ice Snow SUV FR розмір 265/50R22. Виробник: Угорщина	Угорщина	3124	SUV/4x4/	SM000014732	4	13274.00	112H	Michelin	XL Michelin X-Ice Snow SUV FR	265.0	50.0	R	22.0	/	112	H	\N	13	34
629	275/40R22 107T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 275/40R22 107T XL Nokian Hakkapeliitta R5 SUV FR розмір 275/40R22. Виробник: Фінляндія	Фінляндія	4723	SUV/4x4/	SM000017377	2	11498.00	107T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	275.0	40.0	R	22.0	/	107	T	\N	15	156
630	275/50R22 115H XL Michelin X-Ice Snow SUV FR	Шина Michelin 275/50R22 115H XL Michelin X-Ice Snow SUV FR розмір 275/50R22. Виробник: Угорщина	Угорщина	3524	SUV/4x4/	SM000012318	4	13671.00	115H	Michelin	XL Michelin X-Ice Snow SUV FR	275.0	50.0	R	22.0	/	115	H	\N	13	34
631	285/45R22 114T XL Nokian Hakkapeliitta R5 SUV FR	Шина Nokian 285/45R22 114T XL Nokian Hakkapeliitta R5 SUV FR розмір 285/45R22. Виробник: Фінляндія	Фінляндія	3624	SUV/4x4/	SM000006690	8	12015.00	114T	Nokian	XL Nokian Hakkapeliitta R5 SUV FR	285.0	45.0	R	22.0	/	114	T	\N	15	156
632	HL275/50R22 116T XL Nokian Hakkapeliitta R5 SUV 	Шина Nokian HL275/50R22 116T XL Nokian Hakkapeliitta R5 SUV  розмір HL275/50R22. Виробник: Фінляндія	Фінляндія	3824	SUV/4x4/	SM000005470	8	12093.00	116T	Nokian	XL Nokian Hakkapeliitta R5 SUV	\N	\N	\N	\N	\N	\N	\N	\N	15	223
633	285/40R23 111V XL Michelin Pilot Alpin 5 SUV FR	Шина Michelin 285/40R23 111V XL Michelin Pilot Alpin 5 SUV FR розмір 285/40R23. Виробник: Угорщина	Угорщина	3724	SUV/4x4/	SM000012504	4	19460.00	111V	Michelin	XL Michelin Pilot Alpin 5 SUV FR	285.0	40.0	R	23.0	/	111	V	\N	13	70
634	305/35R23 111V XL Michelin Pilot Alpin 5 SUV FR	Шина Michelin 305/35R23 111V XL Michelin Pilot Alpin 5 SUV FR розмір 305/35R23. Виробник: Франція	Франція	3424	SUV/4x4/	SM000016603	2	21741.00	111V	Michelin	XL Michelin Pilot Alpin 5 SUV FR	305.0	35.0	R	23.0	/	111	V	\N	13	70
635	195/80R15 96T Lassa COMPETUS A/T3 	Шина Lassa 195/80R15 96T Lassa COMPETUS A/T3  розмір 195/80R15. Виробник: Туреччина	Туреччина	4924	SUV/4x4/	SM000017896	8	3838.00	96T	Lassa	COMPETUS A/T3	195.0	80.0	R	15.0	/	96	T	\N	23	294
636	205/70R15 96T Lassa COMPETUS A/T3 FR	Шина Lassa 205/70R15 96T Lassa COMPETUS A/T3 FR розмір 205/70R15. Виробник: Туреччина	Туреччина	125 	SUV/4x4/	SM000016179	8	3749.00	96T	Lassa	COMPETUS A/T3 FR	205.0	70.0	R	15.0	/	96	T	\N	23	237
637	215/70R15 97T Cooper Cobra Radial GT RWL 	Шина Cooper 215/70R15 97T Cooper Cobra Radial GT RWL  розмір 215/70R15. Виробник: Мексика	Мексика	2017	SUV/4x4/	SM000017446	4	3465.00	97T	Cooper	Cobra Radial GT RWL	215.0	70.0	R	15.0	/	97	T	\N	7	84
638	215/75R15 100S Sailun Terramax A/T OWL 	Шина Sailun 215/75R15 100S Sailun Terramax A/T OWL  розмір 215/75R15. Виробник: Китай	Китай	624 	SUV/4x4/	SM000017603	4	3775.00	100S	Sailun	Terramax A/T OWL	215.0	75.0	R	15.0	/	100	S	\N	29	289
639	215/80R15 102T Lassa Competus A/T2 	Шина Lassa 215/80R15 102T Lassa Competus A/T2  розмір 215/80R15. Виробник: Туреччина	Туреччина	423 	SUV/4x4/	SM000017333	4	4300.00	102T	Lassa	Competus A/T2	215.0	80.0	R	15.0	/	102	T	\N	23	95
640	235/75R15 109S XL AUSTONE ATHENA SP-302 A/T 	Шина AUSTONE 235/75R15 109S XL AUSTONE ATHENA SP-302 A/T  розмір 235/75R15. Виробник: Китай	Китай	1424	SUV/4x4/	SM000017786	8	3271.00	109S	AUSTONE	XL AUSTONE ATHENA SP-302 A/T	235.0	75.0	R	15.0	/	109	S	\N	3	7
641	30X9.5R15LT 104Q Sailun Terramax M/T OWL P.O.R. FR	Шина Sailun 30X9.5R15LT 104Q Sailun Terramax M/T OWL P.O.R. FR розмір 30X9.5R15LT. Виробник: Китай	Китай	4123	SUV/4x4/	SM000014893	4	5376.00	104Q	Sailun	Terramax M/T OWL P.O.R. FR	30.0	9.5	R	15.0	X	104	Q	LT	29	313
642	31Х10.5R15LT 109Q GRENLANDER PREDATOR M/T RWL P.O.R. FR	Шина GRENLANDER 31Х10.5R15LT 109Q GRENLANDER PREDATOR M/T RWL P.O.R. FR розмір LT31Х10.5R15. Виробник: Китай	Китай	4823	SUV/4x4/	SM000013564	1	4394.00	109Q	GRENLANDER	PREDATOR M/T RWL P.O.R. FR	31.0	10.5	R	15.0	Х	109	Q	LT	18	141
643	31Х10.5R15LT 109Q Sailun Terramax M/T P.O.R. 	Шина Sailun 31Х10.5R15LT 109Q Sailun Terramax M/T P.O.R.  розмір LT31Х10.5R15. Виробник: Китай	Китай	3623	SUV/4x4/	SM000014894	8	5828.00	109Q	Sailun	Terramax M/T P.O.R.	31.0	10.5	R	15.0	Х	109	Q	LT	29	69
644	33X12.5R15LT 108Q Sailun Terramax M/T OWL P.O.R. FR	Шина Sailun 33X12.5R15LT 108Q Sailun Terramax M/T OWL P.O.R. FR розмір 33X12.5R15LT. Виробник: Китай	Китай	4223	SUV/4x4/	SM000009199	8	7030.00	108Q	Sailun	Terramax M/T OWL P.O.R. FR	33.0	12.5	R	15.0	X	108	Q	R	29	313
645	33Х12.5R15LT 108Q GRENLANDER CONQUEWIND R/T OWL P.O.R. FR	Шина GRENLANDER 33Х12.5R15LT 108Q GRENLANDER CONQUEWIND R/T OWL P.O.R. FR розмір 33Х12.5R15LT. Виробник: Китай	Китай	4823	SUV/4x4/	SM000016895	8	5513.00	108Q	GRENLANDER	CONQUEWIND R/T OWL P.O.R. FR	33.0	12.5	R	15.0	Х	108	Q	LT	18	137
646	35Х12.5R15LT 113Q GRENLANDER PREDATOR M/T RWL P.O.R. FR	Шина GRENLANDER 35Х12.5R15LT 113Q GRENLANDER PREDATOR M/T RWL P.O.R. FR розмір 35Х12.5R15LT. Виробник: Китай	Китай	4623	SUV/4x4/	SM000013293	8	6300.00	113Q	GRENLANDER	PREDATOR M/T RWL P.O.R. FR	35.0	12.5	R	15.0	Х	113	Q	LT	18	141
647	LT215/75R15 100/97Q GRENLANDER DRAK M/T P.O.R. FR	Шина GRENLANDER LT215/75R15 100/97Q GRENLANDER DRAK M/T P.O.R. FR розмір LT215/75R15. Виробник: Китай	Китай	4323	SUV/4x4/	SM000016922	2	3203.00	100/97Q	GRENLANDER	DRAK M/T P.O.R. FR	215.0	75.0	\N	15.0	/	100/97	Q	R	18	232
648	LT235/75R15 104/101S GRENLANDER MAGA A/T TWO RWL FR	Шина GRENLANDER LT235/75R15 104/101S GRENLANDER MAGA A/T TWO RWL FR розмір LT235/75R15. Виробник: Китай	Китай	4823	SUV/4x4/	SM000013275	12	3465.00	104/101S	GRENLANDER	MAGA A/T TWO RWL FR	235.0	75.0	\N	15.0	/	104/101	S	R	18	264
649	LT31Х10.5R15 109S Aplus All Terrain A929 OWL 	Шина Aplus LT31Х10.5R15 109S Aplus All Terrain A929 OWL  розмір LT31Х10.5R15. Виробник: Китай	Китай	4023	SUV/4x4/	SM000016262	12	4778.00	109S	Aplus	All Terrain A929 OWL	31.0	10.5	R	15.0	Х	109	Q	LT	1	62
650	215/65R16 102T XL Lassa COMPETUS A/T3 FR	Шина Lassa 215/65R16 102T XL Lassa COMPETUS A/T3 FR розмір 215/65R16. Виробник: Туреччина	Туреччина	1624	SUV/4x4/	SM000016170	12	4190.00	102T	Lassa	XL Lassa COMPETUS A/T3 FR	215.0	65.0	\N	16.0	/	102	T	R	23	269
651	225/70R16 103T Lassa COMPETUS A/T3 FR	Шина Lassa 225/70R16 103T Lassa COMPETUS A/T3 FR розмір 225/70R16. Виробник: Туреччина	Туреччина	125 	SUV/4x4/	SM000005212	4	4851.00	103T	Lassa	COMPETUS A/T3 FR	225.0	70.0	\N	16.0	/	103	T	R	23	237
652	235/85R16 120/116Q Sailun Terramax M/T OWL FR	Шина Sailun 235/85R16 120/116Q Sailun Terramax M/T OWL FR розмір 235/85R16. Виробник: Китай	Китай	2124	SUV/4x4/	SM000014891	4	6248.00	120/116Q	Sailun	Terramax M/T OWL FR	235.0	85.0	\N	16.0	/	120/116	Q	R	29	174
653	245/70R16 111T XL Lassa Competus A/T3 FR	Шина Lassa 245/70R16 111T XL Lassa Competus A/T3 FR розмір 245/70R16. Виробник: Корея	Корея	4724	SUV/4x4/	SM000015892	8	5161.00	111T	Lassa	XL Lassa Competus A/T3 FR	245.0	70.0	\N	16.0	/	111	T	R	23	299
654	255/65R16 109H Nexen Roadian HTX RH5 SUV OWL 	Шина Nexen 255/65R16 109H Nexen Roadian HTX RH5 SUV OWL  розмір 255/65R16. Виробник: Корея	Корея	3524	SUV/4x4/	SM000017875	12	4568.00	109H	Nexen	Roadian HTX RH5 SUV OWL	255.0	65.0	\N	16.0	/	109	H	R	26	275
655	255/70R16 111S Nexen Roadian HTX RH5 OWL FR	Шина Nexen 255/70R16 111S Nexen Roadian HTX RH5 OWL FR розмір 255/70R16. Виробник: Корея	Корея	3224	SUV/4x4/	SM000003499	4	4268.00	111S	Nexen	Roadian HTX RH5 OWL FR	255.0	70.0	\N	16.0	/	111	S	R	26	320
656	265/75R16 116T Nexen Roadian HTX RH5 OWL 	Шина Nexen 265/75R16 116T Nexen Roadian HTX RH5 OWL  розмір 265/75R16. Виробник: Корея	Корея	4023	SUV/4x4/	SM000013115	4	3988.00	116T	Nexen	Roadian HTX RH5 OWL	265.0	75.0	\N	16.0	/	116	T	R	26	278
657	LT225/75R16 115/112Q BF Goodrich Mud-Terrain T/A KM3 RWL P.O.R. FR	Шина BF Goodrich LT225/75R16 115/112Q BF Goodrich Mud-Terrain T/A KM3 RWL P.O.R. FR розмір LT225/75R16. Виробник: США	США	2924	SUV/4x4/	SM000000317	0	10868.00	115/112Q	BF Goodrich	Mud-Terrain T/A KM3 RWL P.O.R. FR	225.0	75.0	\N	16.0	/	115/112	Q	R	4	323
658	LT225/75R16 115/112Q GRENLANDER MAGA A/T ONE 	Шина GRENLANDER LT225/75R16 115/112Q GRENLANDER MAGA A/T ONE  розмір LT225/75R16. Виробник: Китай	Китай	124 	SUV/4x4/	SM000013273	2	3623.00	115/112Q	GRENLANDER	MAGA A/T ONE	225.0	75.0	\N	16.0	/	115/112	Q	R	18	288
659	LT235/85R16 120/116Q GRENLANDER MAGA A/T ONE 	Шина GRENLANDER LT235/85R16 120/116Q GRENLANDER MAGA A/T ONE  розмір LT235/85R16. Виробник: Китай	Китай	124 	SUV/4x4/	SM000016918	8	4337.00	120/116Q	GRENLANDER	MAGA A/T ONE	235.0	85.0	\N	16.0	/	120/116	Q	R	18	288
660	LT245/75R16 120/116N GRENLANDER DRAK M/T P.O.R. FR	Шина GRENLANDER LT245/75R16 120/116N GRENLANDER DRAK M/T P.O.R. FR розмір LT245/75R16. Виробник: Китай	Китай	1124	SUV/4x4/	SM000013562	8	4410.00	120/116N	GRENLANDER	DRAK M/T P.O.R. FR	245.0	75.0	\N	16.0	/	120/116	N	R	18	232
661	LT245/75R16 120/116N Roadmarch Primemaster M/T I P.O.R. 	Шина Roadmarch LT245/75R16 120/116N Roadmarch Primemaster M/T I P.O.R.  розмір LT245/75R16. Виробник: Китай	Китай	2323	SUV/4x4/	SM000016318	4	5460.00	120/116N	Roadmarch	Primemaster M/T I P.O.R.	245.0	75.0	\N	16.0	/	120/116	N	R	27	238
662	LT245/75R16 120/116Q Sailun Terramax M/T OWL P.O.R. FR	Шина Sailun LT245/75R16 120/116Q Sailun Terramax M/T OWL P.O.R. FR розмір LT245/75R16. Виробник: Китай	Китай	5123	SUV/4x4/	SM000016826	4	5686.00	120/116Q	Sailun	Terramax M/T OWL P.O.R. FR	245.0	75.0	\N	16.0	/	120/116	Q	R	29	313
663	LT265/70R16 121/118S GRENLANDER MAGA A/T TWO RWL FR	Шина GRENLANDER LT265/70R16 121/118S GRENLANDER MAGA A/T TWO RWL FR розмір LT265/70R16. Виробник: Китай	Китай	124 	SUV/4x4/	SM000013287	2	4295.00	121/118S	GRENLANDER	MAGA A/T TWO RWL FR	265.0	70.0	\N	16.0	/	121/118	S	R	18	264
664	LT265/75R16 119/116S Toyo Open Country A/T Plus 	Шина Toyo LT265/75R16 119/116S Toyo Open Country A/T Plus  розмір LT265/75R16. Виробник: Японія	Японія	4623	SUV/4x4/	SM000016478	2	6734.00	119/116S	Toyo	Open Country A/T Plus	265.0	75.0	\N	16.0	/	119/116	S	R	32	152
665	LT265/75R16 123/120Q AUSTONE MASPIRE M/T  	Шина AUSTONE LT265/75R16 123/120Q AUSTONE MASPIRE M/T   розмір LT265/75R16. Виробник: Китай	Китай	1224	SUV/4x4/	SM000008765	12	5266.00	123/120Q	AUSTONE	MASPIRE M/T	265.0	75.0	\N	16.0	/	123/120	Q	R	3	39
666	LT265/75R16 123/120S Sailun TERRAMAX  A/T OWL 	Шина Sailun LT265/75R16 123/120S Sailun TERRAMAX  A/T OWL  розмір LT265/75R16. Виробник: Китай	Китай	624 	SUV/4x4/	SM000017601	6	5406.00	123/120S	Sailun	TERRAMAX A/T OWL	265.0	75.0	\N	16.0	/	123/120	S	R	29	68
667	LT285/75R16 116/113Q GRENLANDER PREDATOR M/T RWL P.O.R. FR	Шина GRENLANDER LT285/75R16 116/113Q GRENLANDER PREDATOR M/T RWL P.O.R. FR розмір LT285/75R16. Виробник: Китай	Китай	124 	SUV/4x4/	SM000013563	1	5985.00	116/113Q	GRENLANDER	PREDATOR M/T RWL P.O.R. FR	285.0	75.0	\N	16.0	/	116/113	Q	R	18	141
668	LT285/75R16 126/123R Sailun TERRAMAX A/T 	Шина Sailun LT285/75R16 126/123R Sailun TERRAMAX A/T  розмір LT285/75R16. Виробник: Китай	Китай	1224	SUV/4x4/	SM000017785	8	6227.00	126/123R	Sailun	TERRAMAX A/T	285.0	75.0	\N	16.0	/	126/123	R	R	29	120
669	245/65R17 111T XL Lassa COMPETUS A/T3 	Шина Lassa 245/65R17 111T XL Lassa COMPETUS A/T3  розмір 245/65R17. Виробник: Туреччина	Туреччина	125 	SUV/4x4/	SM000009373	8	6174.00	111T	Lassa	XL Lassa COMPETUS A/T3	245.0	65.0	\N	17.0	/	111	T	R	23	40
670	255/65R17 110T Lassa COMPETUS A/T3 	Шина Lassa 255/65R17 110T Lassa COMPETUS A/T3  розмір 255/65R17. Виробник: Туреччина	Туреччина	125 	SUV/4x4/	SM000009554	8	5864.00	110T	Lassa	COMPETUS A/T3	255.0	65.0	\N	17.0	/	110	T	R	23	294
671	265/70R17 115S Sailun TERRAMAX  A/T OWL FR	Шина Sailun 265/70R17 115S Sailun TERRAMAX  A/T OWL FR розмір 265/70R17. Виробник: Китай	Китай	1224	SUV/4x4/	SM000017543	12	5360.00	115S	Sailun	TERRAMAX A/T OWL FR	265.0	70.0	\N	17.0	/	115	S	R	29	47
672	275/65R17 115S Sailun Terramax A/T 	Шина Sailun 275/65R17 115S Sailun Terramax A/T  розмір 275/65R17. Виробник: Китай	Китай	924 	SUV/4x4/	SM000017568	8	6510.00	115S	Sailun	Terramax A/T	275.0	65.0	\N	17.0	/	115	S	R	29	182
673	285/70R17 121/118Q Sailun TERRAMAX M/T 	Шина Sailun 285/70R17 121/118Q Sailun TERRAMAX M/T  розмір 285/70R17. Виробник: Китай	Китай	124 	SUV/4x4/	SM000017784	4	7875.00	121/118Q	Sailun	TERRAMAX M/T	285.0	70.0	\N	17.0	/	121/118	Q	R	29	94
674	LT265/70R17 121/118Q Sailun Terramax M/T OWL P.O.R. FR	Шина Sailun LT265/70R17 121/118Q Sailun Terramax M/T OWL P.O.R. FR розмір LT265/70R17. Виробник: Китай	Китай	5023	SUV/4x4/	SM000016255	6	6668.00	121/118Q	Sailun	Terramax M/T OWL P.O.R. FR	265.0	70.0	\N	17.0	/	121/118	Q	R	29	313
688	215/60R17 96H Nexen NBlue HD Plus 	Шина Nexen 215/60R17 96H Nexen NBlue HD Plus  розмір 215/60R17. Виробник: Корея	Корея	3824	SUV/4x4/	SM000003580	4	3483.00	96H	Nexen	NBlue HD Plus	215.0	60.0	R	17.0	/	96	H	\N	26	200
675	235/60R18 107W XL Sailun Atrezzo 4 Seasons PRO 	Шина Sailun 235/60R18 107W XL Sailun Atrezzo 4 Seasons PRO  розмір 235/60R18. Виробник: Китай	Китай	5223	SUV/4x4/	SM000017500	4	4144.00	107W	Sailun	XL Sailun Atrezzo 4 Seasons PRO	235.0	60.0	\N	18.0	/	107	W	R	29	227
676	255/60R18 112T XL Lassa COMPETUS A/T3 FR	Шина Lassa 255/60R18 112T XL Lassa COMPETUS A/T3 FR розмір 255/60R18. Виробник: Туреччина	Туреччина	125 	SUV/4x4/	SM000005818	4	6395.00	112T	Lassa	XL Lassa COMPETUS A/T3 FR	255.0	60.0	\N	18.0	/	112	T	R	23	269
677	265/60R18 110T AUSTONE ATHENA SP-302 A/T 	Шина AUSTONE 265/60R18 110T AUSTONE ATHENA SP-302 A/T  розмір 265/60R18. Виробник: Китай	Китай	324 	SUV/4x4/	SM000017787	8	4430.00	110T	AUSTONE	ATHENA SP-302 A/T	265.0	60.0	\N	18.0	/	110	T	R	3	135
678	285/60R18 120S XL GRENLANDER MAGA A/T TWO FR	Шина GRENLANDER 285/60R18 120S XL GRENLANDER MAGA A/T TWO FR розмір 285/60R18. Виробник: Китай	Китай	124 	SUV/4x4/	SM000013291	12	4830.00	120S	GRENLANDER	XL GRENLANDER MAGA A/T TWO FR	285.0	60.0	\N	18.0	/	120	S	R	18	242
679	33Х12.5R18LT 118Q GRENLANDER PREDATOR M/T 	Шина GRENLANDER 33Х12.5R18LT 118Q GRENLANDER PREDATOR M/T  розмір 33Х12.5R18LT. Виробник: Китай	Китай	4623	SUV/4x4/	SM000016897	4	6510.00	118Q	GRENLANDER	PREDATOR M/T	33.0	12.5	R	18.0	Х	118	Q	LT	18	201
680	LT265/70R18 124/121R Sailun Terramax A/T 	Шина Sailun LT265/70R18 124/121R Sailun Terramax A/T  розмір LT265/70R18. Виробник: Китай	Китай	924 	SUV/4x4/	SM000017570	4	5807.00	124/121R	Sailun	Terramax A/T	265.0	70.0	R	18.0	/	124/121	R	LT	29	182
681	255/55R20 110Q XL Goodyear Wrangler DURATRAC LR FR	Шина Goodyear 255/55R20 110Q XL Goodyear Wrangler DURATRAC LR FR розмір 255/55R20. Виробник: Німеччина	Німеччина	923 	SUV/4x4/	SM000002243	4	8820.00	110Q	Goodyear	XL Goodyear Wrangler DURATRAC LR FR	255.0	55.0	R	20.0	/	110	Q	\N	11	245
682	215/65R16 102H XL Pirelli Scorpion Verde 	Шина Pirelli 215/65R16 102H XL Pirelli Scorpion Verde  розмір 215/65R16. Виробник: Румунія	Румунія	423 	SUV/4x4/	SM000013346	4	4599.00	102H	Pirelli	XL Pirelli Scorpion Verde	215.0	65.0	R	16.0	/	102	H	\N	14	209
683	215/65R16 98H VREDESTEIN ULTRAC 	Шина VREDESTEIN 215/65R16 98H VREDESTEIN ULTRAC  розмір 215/65R16. Виробник: Угорщина	Угорщина	624 	SUV/4x4/	SM000004435	12	3770.00	98H	VREDESTEIN	ULTRAC	215.0	65.0	R	16.0	/	98	H	\N	34	282
684	215/70R16 100H Nexen Classe Premiere CP671 	Шина Nexen 215/70R16 100H Nexen Classe Premiere CP671  розмір 215/70R16. Виробник: Корея	Корея	3424	SUV/4x4/	SM000003589	4	3859.00	100H	Nexen	Classe Premiere CP671	215.0	70.0	R	16.0	/	100	H	\N	26	212
685	215/70R16 100V Laufenn S FIT EQ+ LK01 	Шина Laufenn 215/70R16 100V Laufenn S FIT EQ+ LK01  розмір 215/70R16. Виробник: Угорщина	Угорщина	124 	SUV/4x4/	SM000013367	2	3507.00	100V	Laufenn	S FIT EQ+ LK01	215.0	70.0	R	16.0	/	100	V	\N	24	119
686	225/70R16 103V Laufenn S FIT EQ+ LK01 	Шина Laufenn 225/70R16 103V Laufenn S FIT EQ+ LK01  розмір 225/70R16. Виробник: Угорщина	Угорщина	724 	SUV/4x4/	SM000016965	4	3413.00	103V	Laufenn	S FIT EQ+ LK01	225.0	70.0	R	16.0	/	103	V	\N	24	119
689	215/65R17 99V Nexen NFera RU1 SUV 	Шина Nexen 215/65R17 99V Nexen NFera RU1 SUV  розмір 215/65R17. Виробник: Корея	Корея	3824	SUV/4x4/	SM000016241	12	3565.00	99V	Nexen	NFera RU1 SUV	215.0	65.0	R	17.0	/	99	V	\N	26	78
690	215/65R17 99V VREDESTEIN ULTRAC FR	Шина VREDESTEIN 215/65R17 99V VREDESTEIN ULTRAC FR розмір 215/65R17. Виробник: Угорщина	Угорщина	4923	SUV/4x4/	SM000004418	4	3980.00	99V	VREDESTEIN	ULTRAC FR	215.0	65.0	R	17.0	/	99	V	\N	34	102
691	225/60R17 99H Firestone ROADHAWK 2 	Шина Firestone 225/60R17 99H Firestone ROADHAWK 2  розмір 225/60R17. Виробник: Угорщина	Угорщина	3424	SUV/4x4/	SM000017884	12	4307.00	99H	Firestone	ROADHAWK 2	225.0	60.0	R	17.0	/	99	H	\N	10	206
692	225/60R17 99V Nexen NBlue HD Plus 	Шина Nexen 225/60R17 99V Nexen NBlue HD Plus  розмір 225/60R17. Виробник: Корея	Корея	4024	SUV/4x4/	SM000003609	4	3775.00	99V	Nexen	NBlue HD Plus	225.0	60.0	R	17.0	/	99	V	\N	26	200
693	225/60R17 99V Roadstone Roadian HTX RH5 FR	Шина Roadstone 225/60R17 99V Roadstone Roadian HTX RH5 FR розмір 225/60R17. Виробник: Корея	Корея	4423	SUV/4x4/	SM000006800	1	3638.00	99V	Roadstone	Roadian HTX RH5 FR	225.0	60.0	R	17.0	/	99	V	\N	28	55
694	225/65R17 102H Michelin E Primacy 	Шина Michelin 225/65R17 102H Michelin E Primacy  розмір 225/65R17. Виробник: Іспанія	Іспанія	4324	SUV/4x4/	SM000013107	4	5933.00	102H	Michelin	E Primacy	225.0	65.0	R	17.0	/	102	H	\N	13	181
695	225/65R17 106V XL Nexen NFera RU5 SUV FR	Шина Nexen 225/65R17 106V XL Nexen NFera RU5 SUV FR розмір 225/65R17. Виробник: Корея	Корея	3824	SUV/4x4/	SM000003622	4	3586.00	106V	Nexen	XL Nexen NFera RU5 SUV FR	225.0	65.0	R	17.0	/	106	V	\N	26	220
696	255/65R17 110S Nexen Roadian HTX RH5 OWL 	Шина Nexen 255/65R17 110S Nexen Roadian HTX RH5 OWL  розмір 255/65R17. Виробник: Корея	Корея	3124	SUV/4x4/	SM000003690	4	3638.00	110S	Nexen	Roadian HTX RH5 OWL	255.0	65.0	R	17.0	/	110	S	\N	26	278
697	215/55R18 95V Nexen NFera Primus 	Шина Nexen 215/55R18 95V Nexen NFera Primus  розмір 215/55R18. Виробник: Корея	Корея	3823	SUV/4x4/	SM000017878	8	3756.00	95V	Nexen	NFera Primus	215.0	55.0	R	18.0	/	95	V	\N	26	91
698	225/55R18 102W XL Toyo Proxes Comfort FR	Шина Toyo 225/55R18 102W XL Toyo Proxes Comfort FR розмір 225/55R18. Виробник: Японія	Японія	4823	SUV/4x4/	SM000006251	4	5597.00	102W	Toyo	XL Toyo Proxes Comfort FR	225.0	55.0	R	18.0	/	102	W	\N	32	133
699	225/55R18 98V Matador Hectorra 5 FR	Шина Matador 225/55R18 98V Matador Hectorra 5 FR розмір 225/55R18. Виробник: Франція	Франція	1024	SUV/4x4/	SM000013600	4	4342.00	98V	Matador	Hectorra 5 FR	225.0	55.0	R	18.0	/	98	V	\N	25	273
700	225/55R18 98V Nexen NFera RU1 SUV FR	Шина Nexen 225/55R18 98V Nexen NFera RU1 SUV FR розмір 225/55R18. Виробник: Корея	Корея	3824	SUV/4x4/	SM000003603	4	3932.00	98V	Nexen	NFera RU1 SUV FR	225.0	55.0	R	18.0	/	98	V	\N	26	306
701	225/60R18 100W Nexen NFera RU1 SUV FR	Шина Nexen 225/60R18 100W Nexen NFera RU1 SUV FR розмір 225/60R18. Виробник: Корея	Корея	3824	SUV/4x4/	SM000008530	4	4421.00	100W	Nexen	NFera RU1 SUV FR	225.0	60.0	R	18.0	/	100	W	\N	26	306
702	225/60R18 99H Roadstone Classe Premiere CP672 	Шина Roadstone 225/60R18 99H Roadstone Classe Premiere CP672  розмір 225/60R18. Виробник: Корея	Корея	4821	SUV/4x4/	SM000006885	1	2625.00	99H	Roadstone	Classe Premiere CP672	225.0	60.0	R	18.0	/	99	H	\N	28	172
703	235/40R18 95Y XL VREDESTEIN ULTRAC PRO FR	Шина VREDESTEIN 235/40R18 95Y XL VREDESTEIN ULTRAC PRO FR розмір 235/40R18. Виробник: Нідерланди	Нідерланди	724 	SUV/4x4/	SM000004468	4	4568.00	95Y	VREDESTEIN	XL VREDESTEIN ULTRAC PRO FR	235.0	40.0	R	18.0	/	95	Y	\N	34	154
704	235/55R18 100V Nexen NFera RU1 SUV FR	Шина Nexen 235/55R18 100V Nexen NFera RU1 SUV FR розмір 235/55R18. Виробник: Корея	Корея	3624	SUV/4x4/	SM000017879	4	3948.00	100V	Nexen	NFera RU1 SUV FR	235.0	55.0	R	18.0	/	100	V	\N	26	306
705	235/55R18 100V Sailun Atrezzo ZSR SUV FR	Шина Sailun 235/55R18 100V Sailun Atrezzo ZSR SUV FR розмір 235/55R18. Виробник: Китай	Китай	624 	SUV/4x4/	SM000000422	4	3602.00	100V	Sailun	Atrezzo ZSR SUV FR	235.0	55.0	R	18.0	/	100	V	\N	29	229
706	235/55R18 104W XL Roadstone NFera SU1 FR	Шина Roadstone 235/55R18 104W XL Roadstone NFera SU1 FR розмір 235/55R18. Виробник: Корея	Корея	4223	SUV/4x4/	SM000016353	4	4289.00	104W	Roadstone	XL Roadstone NFera SU1 FR	235.0	55.0	R	18.0	/	104	W	\N	28	130
707	235/60R18 103H Nexen NFera RU1 SUV 	Шина Nexen 235/60R18 103H Nexen NFera RU1 SUV  розмір 235/60R18. Виробник: Корея	Корея	4024	SUV/4x4/	SM000017880	4	3742.00	103H	Nexen	NFera RU1 SUV	235.0	60.0	R	18.0	/	103	H	\N	26	78
708	235/60R18 107V XL Matador Hectorra 5 FR	Шина Matador 235/60R18 107V XL Matador Hectorra 5 FR розмір 235/60R18. Виробник: Німеччина	Німеччина	2024	SUV/4x4/	SM000017618	8	5172.00	107V	Matador	XL Matador Hectorra 5 FR	235.0	60.0	R	18.0	/	107	V	\N	25	20
709	235/65R18 110V XL Michelin Latitude Tour HP JLR 	Шина Michelin 235/65R18 110V XL Michelin Latitude Tour HP JLR  розмір 235/65R18. Виробник: Польща	Польща	924 	SUV/4x4/	SM000013845	4	7271.00	110V	Michelin	XL Michelin Latitude Tour HP JLR	235.0	65.0	R	18.0	/	110	V	\N	13	250
710	245/60R18 104V Nexen NFera RU5 SUV FR	Шина Nexen 245/60R18 104V Nexen NFera RU5 SUV FR розмір 245/60R18. Виробник: Корея	Корея	3524	SUV/4x4/	SM000008937	8	4300.00	104V	Nexen	NFera RU5 SUV FR	245.0	60.0	R	18.0	/	104	V	\N	26	52
711	255/55R18 109V XL Matador MP-82 Cоnquerra 2 FR	Шина Matador 255/55R18 109V XL Matador MP-82 Cоnquerra 2 FR розмір 255/55R18. Виробник: Німеччина	Німеччина	1124	SUV/4x4/	SM000002897	4	4347.00	109V	Matador	XL Matador MP-82 Cоnquerra 2 FR	255.0	55.0	R	18.0	/	109	V	\N	25	118
712	255/55R18 109V XL Toyo Proxes ST III FR	Шина Toyo 255/55R18 109V XL Toyo Proxes ST III FR розмір 255/55R18. Виробник: Японія	Японія	4723	SUV/4x4/	SM000004200	4	6185.00	109V	Toyo	XL Toyo Proxes ST III FR	255.0	55.0	R	18.0	/	109	V	\N	32	173
713	255/60R18 108H Nexen Roadian 542 	Шина Nexen 255/60R18 108H Nexen Roadian 542  розмір 255/60R18. Виробник: Корея	Корея	3824	SUV/4x4/	SM000016267	12	3806.00	108H	Nexen	Roadian 542	255.0	60.0	R	18.0	/	108	H	\N	26	144
714	255/60R18 112V XL Sailun Atrezzo ZSR SUV 	Шина Sailun 255/60R18 112V XL Sailun Atrezzo ZSR SUV  розмір 255/60R18. Виробник: Китай	Китай	5123	SUV/4x4/	SM000009074	6	4410.00	112V	Sailun	XL Sailun Atrezzo ZSR SUV	255.0	60.0	R	18.0	/	112	V	\N	29	286
715	255/70R18 116H XL Triangle AdvanteX SUV TR259 	Шина Triangle 255/70R18 116H XL Triangle AdvanteX SUV TR259  розмір 255/70R18. Виробник: Китай	Китай	4420	SUV/4x4/	SM000011535	4	2625.00	116H	Triangle	XL Triangle AdvanteX SUV TR259	255.0	70.0	R	18.0	/	116	H	\N	33	64
716	265/60R18 109H Michelin Latitude Tour HP DEMO 	Шина Michelin 265/60R18 109H Michelin Latitude Tour HP DEMO  розмір 265/60R18. Виробник: Таїланд	Таїланд	818 	SUV/4x4/	SM000006610	1	2415.00	109H	Michelin	Latitude Tour HP DEMO	265.0	60.0	R	18.0	/	109	H	\N	13	100
717	265/60R18 110H Nexen Roadian HTX RH5 	Шина Nexen 265/60R18 110H Nexen Roadian HTX RH5  розмір 265/60R18. Виробник: Корея	Корея	4823	SUV/4x4/	SM000003703	2	4914.00	110H	Nexen	Roadian HTX RH5	265.0	60.0	R	18.0	/	110	H	\N	26	184
718	265/60R18 110V Michelin Pilot Sport 4 SUV FR	Шина Michelin 265/60R18 110V Michelin Pilot Sport 4 SUV FR розмір 265/60R18. Виробник: Угорщина	Угорщина	4024	SUV/4x4/	SM000000207	0	7560.00	110V	Michelin	Pilot Sport 4 SUV FR	265.0	60.0	R	18.0	/	110	V	\N	13	244
719	225/55R19 99H Nexen NFera RU1 FR	Шина Nexen 225/55R19 99H Nexen NFera RU1 FR розмір 225/55R19. Виробник: Корея	Корея	4723	SUV/4x4/	SM000003605	6	4295.00	99H	Nexen	NFera RU1 FR	225.0	55.0	R	19.0	/	99	H	\N	26	98
720	225/55R19 99V Toyo Proxes Comfort 	Шина Toyo 225/55R19 99V Toyo Proxes Comfort  розмір 225/55R19. Виробник: Японія	Японія	4523	SUV/4x4/	SM000016232	8	5899.00	99V	Toyo	Proxes Comfort	225.0	55.0	R	19.0	/	99	V	\N	32	276
721	225/55R19 99V Toyo Proxes ST III FR	Шина Toyo 225/55R19 99V Toyo Proxes ST III FR розмір 225/55R19. Виробник: Японія	Японія	4623	SUV/4x4/	SM000004142	12	5723.00	99V	Toyo	Proxes ST III FR	225.0	55.0	R	19.0	/	99	V	\N	32	314
722	235/50R19 99V Pirelli Powergy FR	Шина Pirelli 235/50R19 99V Pirelli Powergy FR розмір 235/50R19. Виробник: Румунія	Румунія	4523	SUV/4x4/	SM000016381	4	5460.00	99V	Pirelli	Powergy FR	235.0	50.0	R	19.0	/	99	V	\N	14	87
723	235/50R19 99V VREDESTEIN ULTRAC FR	Шина VREDESTEIN 235/50R19 99V VREDESTEIN ULTRAC FR розмір 235/50R19. Виробник: Угорщина	Угорщина	424 	SUV/4x4/	SM000004439	12	5408.00	99V	VREDESTEIN	ULTRAC FR	235.0	50.0	R	19.0	/	99	V	\N	34	102
724	235/55R19 105W XL Nexen NFera SU1 FR	Шина Nexen 235/55R19 105W XL Nexen NFera SU1 FR розмір 235/55R19. Виробник: Корея	Корея	3623	SUV/4x4/	SM000003558	8	4720.00	105W	Nexen	XL Nexen NFera SU1 FR	235.0	55.0	R	19.0	/	105	W	\N	26	108
725	235/55R19 105W XL Pirelli Powergy 	Шина Pirelli 235/55R19 105W XL Pirelli Powergy  розмір 235/55R19. Виробник: Румунія	Румунія	5323	SUV/4x4/	SM000016442	2	5093.00	105W	Pirelli	XL Pirelli Powergy	235.0	55.0	R	19.0	/	105	W	\N	14	148
726	235/55R19 105Y XL Kormoran SUMMER SUV FR	Шина Kormoran 235/55R19 105Y XL Kormoran SUMMER SUV FR розмір 235/55R19. Виробник: Сербія	Сербія	1224	SUV/4x4/	SM000016964	2	4305.00	105Y	Kormoran	XL Kormoran SUMMER SUV FR	235.0	55.0	R	19.0	/	105	Y	\N	22	25
727	245/50R19 105W XL Michelin Latitude Sport 3 ZP * FR	Шина Michelin 245/50R19 105W XL Michelin Latitude Sport 3 ZP * FR розмір 245/50R19. Виробник: Італія	Італія	5223	SUV/4x4/	SM000014008	4	10710.00	105W	Michelin	XL Michelin Latitude Sport 3 ZP * FR	245.0	50.0	R	19.0	/	105	W	\N	13	36
728	245/55R19 103T Nexen Roadian HTX RH5 FR	Шина Nexen 245/55R19 103T Nexen Roadian HTX RH5 FR розмір 245/55R19. Виробник: Корея	Корея	3723	SUV/4x4/	SM000003670	4	5733.00	103T	Nexen	Roadian HTX RH5 FR	245.0	55.0	R	19.0	/	103	T	\N	26	55
729	245/55R19 103V GRENLANDER L-ZEAL 56 FR	Шина GRENLANDER 245/55R19 103V GRENLANDER L-ZEAL 56 FR розмір 245/55R19. Виробник: Китай	Китай	124 	SUV/4x4/	SM000016989	6	3623.00	103V	GRENLANDER	L-ZEAL 56 FR	245.0	55.0	R	19.0	/	103	V	\N	18	296
730	255/50R19 103T Hankook Ventus S1 evo3 EV K127E FR	Шина Hankook 255/50R19 103T Hankook Ventus S1 evo3 EV K127E FR розмір 255/50R19. Виробник: Угорщина	Угорщина	1524	SUV/4x4/	SM000016998	4	6531.00	103T	Hankook	Ventus S1 evo3 EV K127E FR	255.0	50.0	R	19.0	/	103	T	\N	12	240
731	255/50R19 107Y XL Matador Hectorra 5 FR	Шина Matador 255/50R19 107Y XL Matador Hectorra 5 FR розмір 255/50R19. Виробник: Словаччина	Словаччина	4524	SUV/4x4/	SM000013191	2	4909.00	107Y	Matador	XL Matador Hectorra 5 FR	255.0	50.0	R	19.0	/	107	Y	\N	25	20
732	265/50R19 110W XL Hankook Ventus S1 evo3 SUV K127C ROF * FR	Шина Hankook 265/50R19 110W XL Hankook Ventus S1 evo3 SUV K127C ROF * FR розмір 265/50R19. Виробник: Угорщина	Угорщина	324 	SUV/4x4/	SM000016815	4	9188.00	110W	Hankook	XL Hankook Ventus S1 evo3 SUV K127C ROF * FR	265.0	50.0	R	19.0	/	110	W	\N	12	145
733	275/40R19 105Y XL Nexen NFera SU1 FR	Шина Nexen 275/40R19 105Y XL Nexen NFera SU1 FR розмір 275/40R19. Виробник: Корея	Корея	121 	SUV/4x4/	SM000003714	1	3780.00	105Y	Nexen	XL Nexen NFera SU1 FR	275.0	40.0	R	19.0	/	105	Y	\N	26	108
734	275/45R19 108Y XL Fulda EcoControl SUV FR	Шина Fulda 275/45R19 108Y XL Fulda EcoControl SUV FR розмір 275/45R19. Виробник: Німеччина	Німеччина	322 	SUV/4x4/	SM000002386	12	4620.00	108Y	Fulda	XL Fulda EcoControl SUV FR	275.0	45.0	R	19.0	/	108	Y	\N	17	214
735	275/50R19 112W XL Continental ContiPremiumContact 5 МО (б/у до 5000 км.) FR	Шина Continental 275/50R19 112W XL Continental ContiPremiumContact 5 МО (б/у до 5000 км.) FR розмір 275/50R19. Виробник: Чехія	Чехія	821 	SUV/4x4/	SM000015895	4	4148.00	112W	Continental	XL Continental ContiPremiumContact 5 МО (б/у до 5000 км.) FR	275.0	50.0	R	19.0	/	112	W	\N	6	32
736	285/45R19 111Y XL Matador Hectorra 5 FR	Шина Matador 285/45R19 111Y XL Matador Hectorra 5 FR розмір 285/45R19. Виробник: Чехія	Чехія	1624	SUV/4x4/	SM000013192	2	5996.00	111Y	Matador	XL Matador Hectorra 5 FR	285.0	45.0	R	19.0	/	111	Y	\N	25	20
737	295/45R19 113Y XL Michelin Pilot Sport 4 SUV FR	Шина Michelin 295/45R19 113Y XL Michelin Pilot Sport 4 SUV FR розмір 295/45R19. Виробник: Франція	Франція	4622	SUV/4x4/	SM000014422	2	10343.00	113Y	Michelin	XL Michelin Pilot Sport 4 SUV FR	295.0	45.0	R	19.0	/	113	Y	\N	13	10
738	235/50R20 100T Pirelli Scorpion AO (+) SEAL INSIDE ELECT FR	Шина Pirelli 235/50R20 100T Pirelli Scorpion AO (+) SEAL INSIDE ELECT FR розмір 235/50R20. Виробник: Румунія	Румунія	723 	SUV/4x4/	SM000016384	2	6573.00	100T	Pirelli	Scorpion AO (+) SEAL INSIDE ELECT FR	235.0	50.0	R	20.0	/	100	T	\N	14	260
739	245/45R20 103W XL Michelin Latitude Sport 3 ZP * FR	Шина Michelin 245/45R20 103W XL Michelin Latitude Sport 3 ZP * FR розмір 245/45R20. Виробник: Італія	Італія	4723	SUV/4x4/	SM000011566	2	14070.00	103W	Michelin	XL Michelin Latitude Sport 3 ZP * FR	245.0	45.0	R	20.0	/	103	W	\N	13	36
740	245/45R20 103W XL Pirelli PZero PZ4 RUN FLAT * FR	Шина Pirelli 245/45R20 103W XL Pirelli PZero PZ4 RUN FLAT * FR розмір 245/45R20. Виробник: Румунія	Румунія	4423	SUV/4x4/	SM000016945	2	9345.00	103W	Pirelli	XL Pirelli PZero PZ4 RUN FLAT * FR	245.0	45.0	R	20.0	/	103	W	\N	14	13
741	255/45R20 101T Pirelli Scorpion AO (+) SEAL INSIDE ELECT FR	Шина Pirelli 255/45R20 101T Pirelli Scorpion AO (+) SEAL INSIDE ELECT FR розмір 255/45R20. Виробник: Румунія	Румунія	723 	SUV/4x4/	SM000016390	2	9219.00	101T	Pirelli	Scorpion AO (+) SEAL INSIDE ELECT FR	255.0	45.0	R	20.0	/	101	T	\N	14	260
742	255/50R20 109H XL Hankook Ventus S1 evo3 EV K127E AO FR	Шина Hankook 255/50R20 109H XL Hankook Ventus S1 evo3 EV K127E AO FR розмір 255/50R20. Виробник: Угорщина	Угорщина	1124	SUV/4x4/	SM000016999	4	8999.00	109H	Hankook	XL Hankook Ventus S1 evo3 EV K127E AO FR	255.0	50.0	R	20.0	/	109	H	\N	12	169
743	255/50R20 109W XL Pirelli PZero J LR FR	Шина Pirelli 255/50R20 109W XL Pirelli PZero J LR FR розмір 255/50R20. Виробник: Великобританія	Великобританія	3723	SUV/4x4/	SM000016449	4	9445.00	109W	Pirelli	XL Pirelli PZero J LR FR	255.0	50.0	R	20.0	/	109	W	\N	14	231
744	255/50R20 109Y XL Pirelli Scorpion DOT 2023 FR	Шина Pirelli 255/50R20 109Y XL Pirelli Scorpion DOT 2023 FR розмір 255/50R20. Виробник: Італія	Італія	4723	SUV/4x4/	SM000016834	4	8243.00	109Y	Pirelli	XL Pirelli Scorpion DOT 2023 FR	255.0	50.0	R	20.0	/	109	Y	\N	14	66
745	255/55R20 110W XL Continental PremiumContact 6 SSR FR	Шина Continental 255/55R20 110W XL Continental PremiumContact 6 SSR FR розмір 255/55R20. Виробник: Словаччина	Словаччина	4621	SUV/4x4/	SM000001247	2	6825.00	110W	Continental	XL Continental PremiumContact 6 SSR FR	255.0	55.0	R	20.0	/	110	W	\N	6	127
746	265/50R20 111V XL Nexen NFera RU5 SUV 	Шина Nexen 265/50R20 111V XL Nexen NFera RU5 SUV  розмір 265/50R20. Виробник: Корея	Корея	2824	SUV/4x4/	SM000017877	4	7061.00	111V	Nexen	XL Nexen NFera RU5 SUV	265.0	50.0	R	20.0	/	111	V	\N	26	6
747	275/40R20 106Y XL Michelin Latitude Sport 3 ZP FR	Шина Michelin 275/40R20 106Y XL Michelin Latitude Sport 3 ZP FR розмір 275/40R20. Виробник: Італія	Італія	824 	SUV/4x4/	SM000011540	2	10915.00	106Y	Michelin	XL Michelin Latitude Sport 3 ZP FR	275.0	40.0	R	20.0	/	106	Y	\N	13	210
748	275/45R20 110Y XL VREDESTEIN ULTRAC PRO FR	Шина VREDESTEIN 275/45R20 110Y XL VREDESTEIN ULTRAC PRO FR розмір 275/45R20. Виробник: Нідерланди	Нідерланди	524 	SUV/4x4/	SM000004463	0	8243.00	110Y	VREDESTEIN	XL VREDESTEIN ULTRAC PRO FR	275.0	45.0	R	20.0	/	110	Y	\N	34	154
749	275/50R20 109W Pirelli Scorpion Verde MO FR	Шина Pirelli 275/50R20 109W Pirelli Scorpion Verde MO FR розмір 275/50R20. Виробник: Мексика	Мексика	4623	SUV/4x4/	SM000016809	6	9923.00	109W	Pirelli	Scorpion Verde MO FR	275.0	50.0	R	20.0	/	109	W	\N	14	254
750	275/50R20 113H XL Hankook Dynapro HP2+ RA33D AO 	Шина Hankook 275/50R20 113H XL Hankook Dynapro HP2+ RA33D AO  розмір 275/50R20. Виробник: Угорщина	Угорщина	1624	SUV/4x4/	SM000017015	4	9555.00	113H	Hankook	XL Hankook Dynapro HP2+ RA33D AO	275.0	50.0	R	20.0	/	113	H	\N	12	146
751	275/50R20 113W XL Aplus A610 FR	Шина Aplus 275/50R20 113W XL Aplus A610 FR розмір 275/50R20. Виробник: Китай	Китай	4623	SUV/4x4/	SM000016927	2	4148.00	113W	Aplus	XL Aplus A610 FR	275.0	50.0	R	20.0	/	113	W	\N	1	125
752	275/55R20 117V XL GRENLANDER L-ZEAL 56 FR	Шина GRENLANDER 275/55R20 117V XL GRENLANDER L-ZEAL 56 FR розмір 275/55R20. Виробник: Китай	Китай	124 	SUV/4x4/	SM000016994	8	4505.00	117V	GRENLANDER	XL GRENLANDER L-ZEAL 56 FR	275.0	55.0	R	20.0	/	117	V	\N	18	228
753	285/45R20 112W XL Toyo Proxes ST III 	Шина Toyo 285/45R20 112W XL Toyo Proxes ST III  розмір 285/45R20. Виробник: Японія	Японія	4823	SUV/4x4/	SM000004230	8	9765.00	112W	Toyo	XL Toyo Proxes ST III	285.0	45.0	R	20.0	/	112	W	\N	32	257
754	285/45R20 112Y XL Hankook Ventus S1 evo3 EV K127E NE0 FR	Шина Hankook 285/45R20 112Y XL Hankook Ventus S1 evo3 EV K127E NE0 FR розмір 285/45R20. Виробник: Угорщина	Угорщина	924 	SUV/4x4/	SM000016937	4	9870.00	112Y	Hankook	XL Hankook Ventus S1 evo3 EV K127E NE0 FR	285.0	45.0	R	20.0	/	112	Y	\N	12	253
755	285/45R20 112Y XL Michelin Pilot Sport 4 SUV FR	Шина Michelin 285/45R20 112Y XL Michelin Pilot Sport 4 SUV FR розмір 285/45R20. Виробник: Угорщина	Угорщина	1024	SUV/4x4/	SM000003319	4	12285.00	112Y	Michelin	XL Michelin Pilot Sport 4 SUV FR	285.0	45.0	R	20.0	/	112	Y	\N	13	10
756	295/40R20 106V Michelin Latitude Tour HP N0 	Шина Michelin 295/40R20 106V Michelin Latitude Tour HP N0  розмір 295/40R20. Виробник: Угорщина	Угорщина	324 	SUV/4x4/	SM000004250	2	13598.00	106V	Michelin	Latitude Tour HP N0	295.0	40.0	R	20.0	/	106	V	\N	13	83
757	295/40R20 106Y Michelin Latitude Sport 3 N0 	Шина Michelin 295/40R20 106Y Michelin Latitude Sport 3 N0  розмір 295/40R20. Виробник: Франція	Франція	524 	SUV/4x4/	SM000014418	4	13834.00	106Y	Michelin	Latitude Sport 3 N0	295.0	40.0	R	20.0	/	106	Y	\N	13	8
758	265/40R21 105Y XL VREDESTEIN ULTRAC VORTI+ FR	Шина VREDESTEIN 265/40R21 105Y XL VREDESTEIN ULTRAC VORTI+ FR розмір 265/40R21. Виробник: Нідерланди	Нідерланди	1623	SUV/4x4/	SM000004465	4	9608.00	105Y	VREDESTEIN	XL VREDESTEIN ULTRAC VORTI+ FR	265.0	40.0	R	21.0	/	105	Y	\N	34	246
759	HL255/35R21 101Y XL Michelin Pilot Sport 5 ACOUSTIC FR	Шина Michelin HL255/35R21 101Y XL Michelin Pilot Sport 5 ACOUSTIC FR розмір HL255/35R21. Виробник: Угорщина	Угорщина	623 	SUV/4x4/	SM000015128	4	16958.00	101Y	Michelin	XL Michelin Pilot Sport 5 ACOUSTIC FR	\N	\N	\N	\N	\N	\N	\N	\N	13	122
760	275/40R22 108Y XL VREDESTEIN ULTRAC VORTI+ FR	Шина VREDESTEIN 275/40R22 108Y XL VREDESTEIN ULTRAC VORTI+ FR розмір 275/40R22. Виробник: Нідерланди	Нідерланди	2923	SUV/4x4/	SM000004466	4	10343.00	108Y	VREDESTEIN	XL VREDESTEIN ULTRAC VORTI+ FR	275.0	40.0	R	22.0	/	108	Y	\N	34	246
761	285/45R22 114Y XL Michelin Pilot Sport 4 SUV DOT 2023 FR	Шина Michelin 285/45R22 114Y XL Michelin Pilot Sport 4 SUV DOT 2023 FR розмір 285/45R22. Виробник: Угорщина	Угорщина	4423	SUV/4x4/	SM000016513	2	15225.00	114Y	Michelin	XL Michelin Pilot Sport 4 SUV DOT 2023 FR	285.0	45.0	R	22.0	/	114	Y	\N	13	249
762	285/45R22 114Y XL Pirelli PZero PZ4 LR PNCS FR	Шина Pirelli 285/45R22 114Y XL Pirelli PZero PZ4 LR PNCS FR розмір 285/45R22. Виробник: Великобританія	Великобританія	922 	SUV/4x4/	SM000011866	3	12595.00	114Y	Pirelli	XL Pirelli PZero PZ4 LR PNCS FR	285.0	45.0	R	22.0	/	114	Y	\N	14	199
763	295/40R22 112Y XL Michelin Pilot Sport 4 SUV FR	Шина Michelin 295/40R22 112Y XL Michelin Pilot Sport 4 SUV FR розмір 295/40R22. Виробник: Угорщина	Угорщина	1424	SUV/4x4/	SM000003435	4	16653.00	112Y	Michelin	XL Michelin Pilot Sport 4 SUV FR	295.0	40.0	R	22.0	/	112	Y	\N	13	10
764	285/35R23 107Y XL Michelin Pilot Sport 4 SUV FR	Шина Michelin 285/35R23 107Y XL Michelin Pilot Sport 4 SUV FR розмір 285/35R23. Виробник: Угорщина	Угорщина	724 	SUV/4x4/	SM000016557	2	18821.00	107Y	Michelin	XL Michelin Pilot Sport 4 SUV FR	285.0	35.0	R	23.0	/	107	Y	\N	13	10
765	325/30R23 109Y XL Michelin Pilot Sport 4 SUV FR	Шина Michelin 325/30R23 109Y XL Michelin Pilot Sport 4 SUV FR розмір 325/30R23. Виробник: Франція	Франція	2924	SUV/4x4/	SM000016564	2	24413.00	109Y	Michelin	XL Michelin Pilot Sport 4 SUV FR	325.0	30.0	R	23.0	/	109	Y	\N	13	10
766	185/80R14C 102/100R TIGAR CARGO SPEED WINTER пш 	Шина TIGAR 185/80R14C 102/100R TIGAR CARGO SPEED WINTER пш  розмір 185/80R14C. Виробник: Сербія	Сербія	3924	Van	SM000011863	2	3143.00	102/100R	TIGAR	CARGO SPEED WINTER пш	185.0	80.0	R	14.0	/	\N	C	\N	31	80
768	195/70R15C 104/102R TIGAR CARGO SPEED WINTER пш 	Шина TIGAR 195/70R15C 104/102R TIGAR CARGO SPEED WINTER пш  розмір 195/70R15C. Виробник: Сербія	Сербія	3724	Van	SM000000185	2	3292.00	104/102R	TIGAR	CARGO SPEED WINTER пш	195.0	70.0	R	15.0	/	\N	C	\N	31	80
769	215/70R15C 109/107R Kleber Transalp 2+ 	Шина Kleber 215/70R15C 109/107R Kleber Transalp 2+  розмір 215/70R15C. Виробник: Румунія	Румунія	2224	Van	SM000002574	4	4972.00	109/107R	Kleber	Transalp 2+	215.0	70.0	R	15.0	/	\N	C	\N	21	124
770	225/70R15C 112/110R Kleber Transalp 2+ 	Шина Kleber 225/70R15C 112/110R Kleber Transalp 2+  розмір 225/70R15C. Виробник: Румунія	Румунія	3324	Van	SM000015736	2	5066.00	112/110R	Kleber	Transalp 2+	225.0	70.0	R	15.0	/	\N	C	\N	21	124
771	225/70R15C 112/110R TIGAR CARGO SPEED WINTER пш 	Шина TIGAR 225/70R15C 112/110R TIGAR CARGO SPEED WINTER пш  розмір 225/70R15C. Виробник: Сербія	Сербія	2224	Van	SM000006428	10	3859.00	112/110R	TIGAR	CARGO SPEED WINTER пш	225.0	70.0	R	15.0	/	\N	C	\N	31	80
772	195/60R16C 99/97T Nexen Winguard WT1 	Шина Nexen 195/60R16C 99/97T Nexen Winguard WT1  розмір 195/60R16C. Виробник: Корея	Корея	824 	Van	SM000017593	4	3843.00	99/97T	Nexen	Winguard WT1	195.0	60.0	R	16.0	/	\N	C	\N	26	230
773	195/75R16C 107/105R Kormoran VanPro Winter пш 	Шина Kormoran 195/75R16C 107/105R Kormoran VanPro Winter пш  розмір 195/75R16C. Виробник: Сербія	Сербія	323 	Van	SM000011256	7	3098.00	107/105R	Kormoran	VanPro Winter пш	195.0	75.0	R	16.0	/	\N	C	\N	22	248
774	195/75R16C 107/105R WESTLAKE SW612 	Шина WESTLAKE 195/75R16C 107/105R WESTLAKE SW612  розмір 195/75R16C. Виробник: Китай	Китай	2424	Van	SM000017425	2	2835.00	107/105R	WESTLAKE	SW612	195.0	75.0	R	16.0	/	\N	C	\N	35	291
775	205/65R16C 107/105T Kleber Transalp 2+ 	Шина Kleber 205/65R16C 107/105T Kleber Transalp 2+  розмір 205/65R16C. Виробник: Румунія	Румунія	1324	Van	SM000002604	4	5455.00	107/105T	Kleber	Transalp 2+	205.0	65.0	R	16.0	/	\N	C	\N	21	124
776	205/65R16C 107/105T Triangle SnowLink Trin LL01 	Шина Triangle 205/65R16C 107/105T Triangle SnowLink Trin LL01  розмір 205/65R16C. Виробник: Китай	Китай	3824	Van	SM000012310	0	3276.00	107/105T	Triangle	SnowLink Trin LL01	205.0	65.0	R	16.0	/	\N	C	\N	33	90
777	215/65R16C 106/104T Kleber Transalp 2+ 	Шина Kleber 215/65R16C 106/104T Kleber Transalp 2+  розмір 215/65R16C. Виробник: Румунія	Румунія	2524	Van	SM000017389	6	5644.00	106/104T	Kleber	Transalp 2+	215.0	65.0	R	16.0	/	\N	C	\N	21	124
778	215/65R16C 109/107R Aplus A869 	Шина Aplus 215/65R16C 109/107R Aplus A869  розмір 215/65R16C. Виробник: Китай	Китай	2124	Van	SM000012048	0	3486.00	109/107R	Aplus	A869	215.0	65.0	R	16.0	/	\N	C	\N	1	307
779	215/65R16C 109/107R Kleber Transalp 2+ 	Шина Kleber 215/65R16C 109/107R Kleber Transalp 2+  розмір 215/65R16C. Виробник: Румунія	Румунія	2324	Van	SM000002605	2	5749.00	109/107R	Kleber	Transalp 2+	215.0	65.0	R	16.0	/	\N	C	\N	21	124
780	225/65R16C 112/110R Kleber Transalp 2+ 	Шина Kleber 225/65R16C 112/110R Kleber Transalp 2+  розмір 225/65R16C. Виробник: Румунія	Румунія	2924	Van	SM000002577	4	6116.00	112/110R	Kleber	Transalp 2+	225.0	65.0	R	16.0	/	\N	C	\N	21	124
781	225/75R16C 121/120R Aplus A869 	Шина Aplus 225/75R16C 121/120R Aplus A869  розмір 225/75R16C. Виробник: Китай	Китай	2324	Van	SM000012222	0	6143.00	121/120R	Aplus	A869	225.0	75.0	R	16.0	/	\N	C	\N	1	307
782	235/65R16C 115/113R Diamondback SnowLink DW701 	Шина Diamondback 235/65R16C 115/113R Diamondback SnowLink DW701  розмір 235/65R16C. Виробник: Китай	Китай	3024	Van	SM000017600	2	3878.00	115/113R	Diamondback	SnowLink DW701	235.0	65.0	R	16.0	/	\N	C	\N	16	139
783	225/70R15C 112/110R Lassa MULTIWAYS-C 	Шина Lassa 225/70R15C 112/110R Lassa MULTIWAYS-C  розмір 225/70R15C. Виробник: Туреччина	Туреччина	2024	Van	SM000006366	2	3990.00	112/110R	Lassa	MULTIWAYS-C	225.0	70.0	R	15.0	/	\N	C	\N	23	23
784	225/70R15C 112/110R TIGAR All Season Light Truck 	Шина TIGAR 225/70R15C 112/110R TIGAR All Season Light Truck  розмір 225/70R15C. Виробник: Сербія	Сербія	2724	Van	SM000006017	4	4043.00	112/110R	TIGAR	All Season Light Truck	225.0	70.0	R	15.0	/	\N	C	\N	31	123
785	195/75R16C 107/105R TIGAR All Season Light Truck 	Шина TIGAR 195/75R16C 107/105R TIGAR All Season Light Truck  розмір 195/75R16C. Виробник: Сербія	Сербія	724 	Van	SM000017385	4	4025.00	107/105R	TIGAR	All Season Light Truck	195.0	75.0	R	16.0	/	\N	C	\N	31	123
786	205/65R16C 107/105T Sailun Commercio 4 Seasons 	Шина Sailun 205/65R16C 107/105T Sailun Commercio 4 Seasons  розмір 205/65R16C. Виробник: Китай	Китай	2424	Van	SM000009129	4	3449.00	107/105T	Sailun	Commercio 4 Seasons	205.0	65.0	R	16.0	/	\N	C	\N	29	24
787	195/80R14C 106/104Q Sailun Extmile SL87N 	Шина Sailun 195/80R14C 106/104Q Sailun Extmile SL87N  розмір 195/80R14C. Виробник: Китай	Китай	4323	Van	SM000016825	4	2520.00	106/104Q	Sailun	Extmile SL87N	195.0	80.0	R	14.0	/	\N	C	\N	29	132
788	195/80R14C 106/104R GRENLANDER L-MAX9 	Шина GRENLANDER 195/80R14C 106/104R GRENLANDER L-MAX9  розмір 195/80R14C. Виробник: Китай	Китай	4923	Van	SM000013266	2	2231.00	106/104R	GRENLANDER	L-MAX9	195.0	80.0	R	14.0	/	\N	C	\N	18	151
789	195/80R14C 106/104R GRENLANDER L-STRONG 36 	Шина GRENLANDER 195/80R14C 106/104R GRENLANDER L-STRONG 36  розмір 195/80R14C. Виробник: Китай	Китай	4923	Van	SM000016868	4	2205.00	106/104R	GRENLANDER	L-STRONG 36	195.0	80.0	R	14.0	/	\N	C	\N	18	196
790	195/80R14C 106/104R Kormoran CargoSpeed Evo 	Шина Kormoran 195/80R14C 106/104R Kormoran CargoSpeed Evo  розмір 195/80R14C. Виробник: Сербія	Сербія	1024	Van	SM000016955	4	2888.00	106/104R	Kormoran	CargoSpeed Evo	195.0	80.0	R	14.0	/	\N	C	\N	22	167
791	195/80R14C 106/104R Lassa Transway 3 	Шина Lassa 195/80R14C 106/104R Lassa Transway 3  розмір 195/80R14C. Виробник: Туреччина	Туреччина	425 	Van	SM000005146	4	3591.00	106/104R	Lassa	Transway 3	195.0	80.0	R	14.0	/	\N	C	\N	23	261
792	205/80R14C 109/107P Matador Hectorra Van 	Шина Matador 205/80R14C 109/107P Matador Hectorra Van  розмір 205/80R14C. Виробник: Чехія	Чехія	2222	Van	SM000013186	2	3780.00	109/107P	Matador	Hectorra Van	205.0	80.0	R	14.0	/	\N	C	\N	25	308
793	215/75R14C 112/110R GRENLANDER L-MAX9 	Шина GRENLANDER 215/75R14C 112/110R GRENLANDER L-MAX9  розмір 215/75R14C. Виробник: Китай	Китай	4923	Van	SM000013558	2	2499.00	112/110R	GRENLANDER	L-MAX9	215.0	75.0	R	14.0	/	\N	C	\N	18	151
794	215/80R14C 112/110R GRENLANDER L-MAX9 	Шина GRENLANDER 215/80R14C 112/110R GRENLANDER L-MAX9  розмір 215/80R14C. Виробник: Китай	Китай	124 	Van	SM000013559	2	2825.00	112/110R	GRENLANDER	L-MAX9	215.0	80.0	R	14.0	/	\N	C	\N	18	151
795	195/70R15C 104/102R GRENLANDER L-MAX9 	Шина GRENLANDER 195/70R15C 104/102R GRENLANDER L-MAX9  розмір 195/70R15C. Виробник: Китай	Китай	4023	Van	SM000016866	2	2189.00	104/102R	GRENLANDER	L-MAX9	195.0	70.0	R	15.0	/	\N	C	\N	18	151
796	195/70R15C 104/102R Kormoran CargoSpeed Evo 	Шина Kormoran 195/70R15C 104/102R Kormoran CargoSpeed Evo  розмір 195/70R15C. Виробник: Сербія	Сербія	824 	Van	SM000013125	10	2835.00	104/102R	Kormoran	CargoSpeed Evo	195.0	70.0	R	15.0	/	\N	C	\N	22	167
797	195/70R15C 104/102R Lassa Transway 3 	Шина Lassa 195/70R15C 104/102R Lassa Transway 3  розмір 195/70R15C. Виробник: Туреччина	Туреччина	225 	Van	SM000006239	8	3486.00	104/102R	Lassa	Transway 3	195.0	70.0	R	15.0	/	\N	C	\N	23	261
798	195/80R15C 106/104R GRENLANDER L-STRONG 36 	Шина GRENLANDER 195/80R15C 106/104R GRENLANDER L-STRONG 36  розмір 195/80R15C. Виробник: Китай	Китай	124 	Van	SM000016869	4	2436.00	106/104R	GRENLANDER	L-STRONG 36	195.0	80.0	R	15.0	/	\N	C	\N	18	196
799	195/80R15C 106/104R Lassa Transway  	Шина Lassa 195/80R15C 106/104R Lassa Transway   розмір 195/80R15C. Виробник: Туреччина	Туреччина	2024	Van	SM000009043	4	3770.00	106/104R	Lassa	Transway	195.0	80.0	R	15.0	/	\N	C	\N	23	226
800	205/70R15C 106/104R GRENLANDER L-MAX9 	Шина GRENLANDER 205/70R15C 106/104R GRENLANDER L-MAX9  розмір 205/70R15C. Виробник: Китай	Китай	4823	Van	SM000016871	2	2385.00	106/104R	GRENLANDER	L-MAX9	205.0	70.0	R	15.0	/	\N	C	\N	18	151
801	215/65R15C 104/102T Kleber Transpro 	Шина Kleber 215/65R15C 104/102T Kleber Transpro  розмір 215/65R15C. Виробник: Румунія	Румунія	4622	Van	SM000011683	8	4463.00	104/102T	Kleber	Transpro	215.0	65.0	R	15.0	/	\N	C	\N	21	302
822	225/75R16C 121/120R Lassa Transway 2 	Шина Lassa 225/75R16C 121/120R Lassa Transway 2  розмір 225/75R16C. Виробник: Туреччина	Туреччина	5124	Van	SM000006811	8	5691.00	121/120R	Lassa	Transway 2	225.0	75.0	R	16.0	/	\N	C	\N	23	79
823	7.50R16LT 121/120L Goodyear DURAMAX STEEL 	Шина Goodyear 7.50R16LT 121/120L Goodyear DURAMAX STEEL  розмір 7.50R16LT. Виробник: Словенія	Словенія	4221	Van	SM000013253	12	6458.00	121/120L	Goodyear	DURAMAX STEEL	7.5	\N	R	16.0	\N	121/120	L	LT	11	217
824	7.50R16LT 122/120L Goodyear DURAMAX STEEL 	Шина Goodyear 7.50R16LT 122/120L Goodyear DURAMAX STEEL  розмір 7.50R16LT. Виробник: Словенія	Словенія	3322	Van	SM000013231	12	6405.00	122/120L	Goodyear	DURAMAX STEEL	7.5	\N	R	16.0	\N	121/120	L	LT	11	217
825	215/60R17C 109/107T Matador Hectorra Van 	Шина Matador 215/60R17C 109/107T Matador Hectorra Van  розмір 215/60R17C. Виробник: Чехія	Чехія	2024	Van	SM000017616	4	5355.00	109/107T	Matador	Hectorra Van	215.0	60.0	R	17.0	/	\N	C	\N	25	308
802	215/65R15C 104/102T Kleber Transpro 2 	Шина Kleber 215/65R15C 104/102T Kleber Transpro 2  розмір 215/65R15C. Виробник: Румунія	Румунія	4923	Van	SM000013399	12	4725.00	104/102T	Kleber	Transpro 2	215.0	65.0	R	15.0	/	\N	C	\N	21	317
803	215/70R15C 109/107S Sailun Commercio PRO 	Шина Sailun 215/70R15C 109/107S Sailun Commercio PRO  розмір 215/70R15C. Виробник: Китай	Китай	4823	Van	SM000009063	2	3329.00	109/107S	Sailun	Commercio PRO	215.0	70.0	R	15.0	/	\N	C	\N	29	293
804	225/70R15C 112/110R Lassa Transway 2 	Шина Lassa 225/70R15C 112/110R Lassa Transway 2  розмір 225/70R15C. Виробник: Туреччина	Туреччина	125 	Van	SM000005114	6	4232.00	112/110R	Lassa	Transway 2	225.0	70.0	R	15.0	/	\N	C	\N	23	79
805	225/70R15C 112/110S Sailun Commercio PRO 	Шина Sailun 225/70R15C 112/110S Sailun Commercio PRO  розмір 225/70R15C. Виробник: Китай	Китай	4023	Van	SM000016159	12	3198.00	112/110S	Sailun	Commercio PRO	225.0	70.0	R	15.0	/	\N	C	\N	29	293
806	225/70R15C 116/114S Lassa Transway 3 	Шина Lassa 225/70R15C 116/114S Lassa Transway 3  розмір 225/70R15C. Виробник: Туреччина	Туреччина	4924	Van	SM000009000	8	4368.00	116/114S	Lassa	Transway 3	225.0	70.0	R	15.0	/	\N	C	\N	23	261
807	195/75R16C 110/108R TIGAR CargoSpeed Evo 	Шина TIGAR 195/75R16C 110/108R TIGAR CargoSpeed Evo  розмір 195/75R16C. Виробник: Сербія	Сербія	1523	Van	SM000006159	10	3854.00	110/108R	TIGAR	CargoSpeed Evo	195.0	75.0	R	16.0	/	\N	C	\N	31	167
808	205/65R16C 103/101H Hankook Vantra LT RA18 	Шина Hankook 205/65R16C 103/101H Hankook Vantra LT RA18  розмір 205/65R16C. Виробник: Угорщина	Угорщина	1123	Van	SM000013395	2	4253.00	103/101H	Hankook	Vantra LT RA18	205.0	65.0	R	16.0	\N	103/101	H	C	12	179
809	205/65R16C 107/105T Laufenn X FIT Van LV01 	Шина Laufenn 205/65R16C 107/105T Laufenn X FIT Van LV01  розмір 205/65R16C. Виробник: Угорщина	Угорщина	924 	Van	SM000013159	2	3402.00	107/105T	Laufenn	X FIT Van LV01	205.0	65.0	R	16.0	/	\N	C	\N	24	136
810	205/75R16C 110/108R GRENLANDER L-MAX9 	Шина GRENLANDER 205/75R16C 110/108R GRENLANDER L-MAX9  розмір 205/75R16C. Виробник: Китай	Китай	124 	Van	SM000016873	4	2704.00	110/108R	GRENLANDER	L-MAX9	205.0	75.0	R	16.0	/	\N	C	\N	18	151
811	205/75R16C 110/108R GRENLANDER L-STRONG 36 	Шина GRENLANDER 205/75R16C 110/108R GRENLANDER L-STRONG 36  розмір 205/75R16C. Виробник: Китай	Китай	4722	Van	SM000013350	2	2573.00	110/108R	GRENLANDER	L-STRONG 36	205.0	75.0	R	16.0	/	\N	C	\N	18	196
812	205/75R16C 113/111R Sailun Commercio PRO 	Шина Sailun 205/75R16C 113/111R Sailun Commercio PRO  розмір 205/75R16C. Виробник: Китай	Китай	4223	Van	SM000009191	6	3150.00	113/111R	Sailun	Commercio PRO	205.0	75.0	R	16.0	/	\N	C	\N	29	293
813	215/70R15C 104/101R GRENLANDER L-MAX9 	Шина GRENLANDER 215/70R15C 104/101R GRENLANDER L-MAX9  розмір 215/70R15C. Виробник: Китай	Китай	124 	Van	SM000016876	4	2536.00	104/101R	GRENLANDER	L-MAX9	215.0	70.0	R	15.0	/	\N	C	\N	18	151
814	215/70R16C 108/106R GRENLANDER L-MAX9 	Шина GRENLANDER 215/70R16C 108/106R GRENLANDER L-MAX9  розмір 215/70R16C. Виробник: Китай	Китай	4623	Van	SM000016877	2	2587.00	108/106R	GRENLANDER	L-MAX9	215.0	70.0	R	16.0	/	\N	C	\N	18	151
815	215/75R16C 113/111R Kormoran CargoSpeed Evo 	Шина Kormoran 215/75R16C 113/111R Kormoran CargoSpeed Evo  розмір 215/75R16C. Виробник: Сербія	Сербія	623 	Van	SM000013180	2	3486.00	113/111R	Kormoran	CargoSpeed Evo	215.0	75.0	R	16.0	/	\N	C	\N	22	167
816	215/75R16C 116/114R GRENLANDER L-MAX9 	Шина GRENLANDER 215/75R16C 116/114R GRENLANDER L-MAX9  розмір 215/75R16C. Виробник: Китай	Китай	124 	Van	SM000016878	4	2993.00	116/114R	GRENLANDER	L-MAX9	215.0	75.0	R	16.0	/	\N	C	\N	18	151
817	215/75R16C 116/114R GRENLANDER L-STRONG 36 	Шина GRENLANDER 215/75R16C 116/114R GRENLANDER L-STRONG 36  розмір 215/75R16C. Виробник: Китай	Китай	4523	Van	SM000016879	10	2940.00	116/114R	GRENLANDER	L-STRONG 36	215.0	75.0	R	16.0	/	\N	C	\N	18	196
818	215/75R16C 116/114R Lassa Transway 2 	Шина Lassa 215/75R16C 116/114R Lassa Transway 2  розмір 215/75R16C. Виробник: Туреччина	Туреччина	225 	Van	SM000005797	8	5072.00	116/114R	Lassa	Transway 2	215.0	75.0	R	16.0	/	\N	C	\N	23	79
819	225/75R16C 116/114R GRENLANDER L-MAX9 	Шина GRENLANDER 225/75R16C 116/114R GRENLANDER L-MAX9  розмір 225/75R16C. Виробник: Китай	Китай	4923	Van	SM000016886	2	2789.00	116/114R	GRENLANDER	L-MAX9	225.0	75.0	R	16.0	/	\N	C	\N	18	151
820	225/75R16C 118/116R Kleber Transpro 	Шина Kleber 225/75R16C 118/116R Kleber Transpro  розмір 225/75R16C. Виробник: Румунія	Румунія	923 	Van	SM000013410	4	5765.00	118/116R	Kleber	Transpro	225.0	75.0	R	16.0	/	\N	C	\N	21	302
821	225/75R16C 118/116R Kleber Transpro 2 	Шина Kleber 225/75R16C 118/116R Kleber Transpro 2  розмір 225/75R16C. Виробник: Румунія	Румунія	624 	Van	SM000016274	2	5780.00	118/116R	Kleber	Transpro 2	225.0	75.0	R	16.0	/	\N	C	\N	21	317
\.


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shshopuser
--

SELECT pg_catalog.setval('public.brands_id_seq', 1, false);


--
-- Name: models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shshopuser
--

SELECT pg_catalog.setval('public.models_id_seq', 326, true);


--
-- Name: tires_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shshopuser
--

SELECT pg_catalog.setval('public.tires_id_seq', 825, true);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: models models_pkey; Type: CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);


--
-- Name: tyres tires_pkey; Type: CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.tyres
    ADD CONSTRAINT tires_pkey PRIMARY KEY (id);


--
-- Name: tyres tires_sku_key; Type: CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.tyres
    ADD CONSTRAINT tires_sku_key UNIQUE (sku);


--
-- Name: models models_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT "models_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tyres tyres_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shshopuser
--

ALTER TABLE ONLY public.tyres
    ADD CONSTRAINT tyres_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: smshopuser
--

ALTER DEFAULT PRIVILEGES FOR ROLE smshopuser IN SCHEMA public GRANT SELECT ON TABLES TO smshopuser;


--
-- PostgreSQL database dump complete
--

