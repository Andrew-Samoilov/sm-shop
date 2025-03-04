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
-- PostgreSQL database dump complete
--

