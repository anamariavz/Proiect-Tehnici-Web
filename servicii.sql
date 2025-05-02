DROP TABLE servicii;
DROP TYPE IF EXISTS complexitate;

CREATE TYPE complexitate AS ENUM( 'Redusă', 'Medie', 'Ridicată' );

CREATE TABLE IF NOT EXISTS servicii (
   id serial PRIMARY KEY,
   nume VARCHAR(100) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   durata VARCHAR(20) NOT NULL,
   grad_complexitate complexitate DEFAULT 'Redusă',
   tip_serviciu VARCHAR(50),
   categorie VARCHAR(50),
   materiale_folosite VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   necesita_anestezie BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);


INSERT into servicii (nume, descriere, pret, durata, grad_complexitate, tip_serviciu, categorie, necesita_anestezie, materiale_folosite, imagine) VALUES 
('Consultație', 	'Evaluare medicală orală și plan de tratament.', 	150, 	'15–30 min', 	'Redusă', 	'Consult stomatologic', 	'Profilaxie și igienizare dentară', 	FALSE, 	'{"Echipamente_evaluare"}', 	 ' Air Flow total (ambele arcade).jpg '  ),
('Detartraj cu ultrasunete + periaj profesional', 	'Curățare completă a tartrului și lustruire dentară.', 	350, 	'30–40 min', 	'Redusă', 	'Detartraj complet', 	'Profilaxie și igienizare dentară', 	FALSE, 	'{"Perii", "ultrasunete", "gel"}', 	'Albire dentară.jpg'),
('Air Flow total (ambele arcade)', 	'Curățare cu jet de aer, apă și pulbere, pentru pete și placă.', 	250, 	'20–30 min', 	'Redusă', 	'Air Flow', 	'Profilaxie și igienizare dentară', 	FALSE, 	'{"Aparat_Air_Flow", "pulbere", "apă"}', 	'Anestezie locală computerizată DentaPen.jpg'),
('Periaj profesional Happy Brush', 	'Periaj specializat pentru igienizare și luciu dentar.', 	150, 	'15–20 min', 	'Redusă', 	'Periaj mecanic', 	'Profilaxie și igienizare dentară', 	FALSE, 	'{"Perii_Happy_Brush", "pastă"}', 	'Aparat dentar fix cu bracketi fizionomici.jpg'),
('Albire dentară', 	'Tratament pentru deschiderea nuanței dinților.', 	1500, 	'45–60 min', 	'Medie', 	'Albire dentară', 	'Estetică dentară', 	FALSE, 	'{"Gel_albire", "lampă_UV"}', 	'Aparat dentar fix cu bracketi metalici.jpg'),
('Fațete dentare ceramice (E-max)', 	'Fațete estetice rezistente, din ceramică presată.', 	1500, 	'60–90 min', 	'Ridicată', 	'Fațete E-max', 	'Estetică dentară', 	TRUE, 	'{"Fațete_E-max", "ciment"}', 	'Aparat dentar fix cu bracketi safir.jpg'),
('Fațete dentare Full-Zirconiu', 	'Fațete opace, foarte rezistente, din zirconiu integral.', 	1250, 	'60–90 min', 	'Ridicată', 	'Fațete zirconiu', 	'Estetică dentară', 	TRUE, 	'{"Fațete_zirconiu", "ciment"}', 	'Aparat dentar fix lingual INCOGNITO.jpg'),
('Fațete dentare Non-Prep', 	'Fațete aplicate fără șlefuirea dinților.', 	2500, 	'60 min', 	'Medie', 	'Fațete non-prep', 	'Estetică dentară', 	FALSE, 	'{"Fațete_compozit", "fatete_ceramic", "ciment"}', 	'Aparat dentar fix lingual individualizat WIN.jpg'),
('Implant dentar Megagen, INNO (Coreea)', 	'Rădăcină dentară artificială, origine Coreea.', 	2700, 	'60–90 min', 	'Ridicată', 	'Implant Megagen', 	'Implantologie', 	TRUE, 	'{"Implant", "șuruburi", "abutment", "kit_chirurgical"}', 	'Aparat dentar fix sistem DAMON.jpg'),
('Implant dentar ICX (Germania & Elveția)', 	'Implant premium german-elvețian.', 	3200, 	'60–90 min', 	'Ridicată', 	'Implant ICX', 	'Implantologie', 	TRUE, 	'{"Implant", "șuruburi", "abutment", "kit_chirurgical"}', 	'Aparat dentar mobil.jpg'),
('Implant dentar Nobel (SUA)', 	'Implant de top, fabricat în SUA.', 	5000, 	'60–90 min', 	'Ridicată', 	'Implant Nobel', 	'Implantologie', 	TRUE, 	'{"Implant", "șuruburi", "abutment", "kit_chirurgical"}', 	'Bont individualizat.jpg'),
('Bont protetic drept', 	'Piesă care susține coroana pe implant, fără unghi.', 	250, 	'30 min', 	'Medie', 	'Bont drept', 	'Implantologie', 	TRUE, 	'{"Bont_metal", "ciment"}', 	'Bont protetic angulat.jpg'),
('Bont protetic angulat', 	'Piesă pe implant cu înclinație pentru aliniere.', 	500, 	'30 min', 	'Medie', 	'Bont angulat', 	'Implantologie', 	TRUE, 	'{"Bont_metal", "ciment"}', 	'Bont protetic din zirconiu.jpg'),
('Bont individualizat', 	'Piesă personalizată pentru restaurări precise.', 	750, 	'30–60 min', 	'Ridicată', 	'Bont personalizat', 	'Implantologie', 	TRUE, 	'{"Bont_personalizat", "ciment"}', 	'Bont protetic drept.jpg'),
('Bont protetic din zirconiu', 	'Bont estetic, alb, din zirconiu.', 	1000, 	'30–60 min', 	'Ridicată', 	'Bont zirconiu', 	'Implantologie', 	TRUE, 	'{"Bont_zirconiu", "ciment"}', 	'Consultație.jpg'),
('Aparat dentar fix cu bracketi metalici / arcadă', 	'Corecție ortodontică clasică, cu metal.', 	4800, 	'60–90 min', 	'Medie', 	'Aparat fix', 	'Ortodonție', 	TRUE, 	'{"Bracketi_metalici", "arcuri_linguale"}', 	'Consultație pedodontică de specialitate.jpg'),
('Aparat dentar fix cu bracketi fizionomici / arcadă', 	'Bracketi colorați în nuanța dinților.', 	4900, 	'60–90 min', 	'Medie', 	'Aparat fix', 	'Ortodonție', 	TRUE, 	'{"Bracketi_fizionomici", "arcuri_linguale"}', 	'Consultație stomatologie pediatrică.jpg'),
('Aparat dentar fix cu bracketi safir / arcadă', 	'Bracketi transparenți, din safir.', 	6300, 	'60–90 min', 	'Medie', 	'Aparat fix', 	'Ortodonție', 	TRUE, 	'{"Bracketi_safir", "arcuri_linguale"}', 	'Detartraj cu ultrasunete + periaj profesional.jpg'),
('Aparat dentar fix sistem DAMON / arcadă: ', 	'Sistem cu frecare redusă, confort crescut.', 	6300, 	'60–90 min', 	'Medie', 	'Aparat fix', 	'Ortodonție', 	TRUE, 	'{"Bracketi_DAMON", "arcuri_linguale"}', 	'Drenaj abces.jpg'),
('Aparat dentar fix lingual individualizat WIN / arcadă: ', 	'Aparat invizibil, montat pe interior.', 	9000, 	'120–180 min', 	'Ridicată', 	'Aparat lingual', 	'Ortodonție', 	TRUE, 	'{"Bracketi_WIN", "arcuri_linguale"}', 	'Extracție dinte monoradicular.jpg'),
('Aparat dentar fix lingual INCOGNITO / arcadă: ', 	'Ortodonție invizibilă de lux, internă.', 	12000, 	'120–180 min', 	'Ridicată', 	'Aparat lingual', 	'Ortodonție', 	TRUE, 	'{"Bracketi_INCOGNITO", "arcuri_linguale"}', 	'Extracție dinte pluriradicular.jpg'),
('Aparat dentar mobil / arcadă', 	'Dispozitiv detașabil pentru copii sau corecții minore.', 	1850, 	'30–60 min', 	'Redusă', 	'Aparat mobil', 	'Ortodonție', 	FALSE, 	'{"Aliniatori", "arcuri", "suporturi"}', 	'Extracție dinte temporar.jpg'),
('Tratament cu alignere aparat INVISALIGN LITE', 	'Gutieră transparentă pentru corecții minore.', 	10000, 	'30 min', 	'Medie', 	'Invisalign Lite', 	'Ortodonție', 	FALSE, 	'{"Aliniatori_Invisalign", "materiale_imobilizare"}', 	'Extracție molar de minte.jpg'),
('Tratament cu alignere aparat dentar invizibil INVISALIGN Teen / ambele arcade', 	'Aliniatori transparenți pentru adolescenți.', 	15000, 	'30 min', 	'Medie', 	'Invisalign Teen', 	'Ortodonție', 	FALSE, 	'{"Aliniatori_Invisalign_Teen", "materiale imobilizare"}', 	'Fațete dentare ceramice (E-max).jpg'),
('Tratament endodontic dinte monoradicular​', 	'Curățare și sigilare canal la dinte cu o rădăcină.', 	200, 	'60–75 min', 	'Medie', 	'Endo monoradicular', 	'Endodonție', 	TRUE, 	'{"conuri", "instrumente_endodontice", "pastă"}', 	'Fațete dentare Full-Zirconiu.jpg'),
('Tratament endodontic premolar', 	'Tratament de canal pentru premolar.', 	250, 	'75–90 min', 	'Medie', 	'Endo premolar', 	'Endodonție', 	TRUE, 	'{"conuri", "instrumente_endodontice", "pastă"}', 	'Fațete dentare Non-Prep.jpg'),
('Tratament endodontic dinte pluriradicular', 	'Curățare canale pentru molari.', 	350, 	'90–120 min', 	'Ridicată', 	'Endo pluriradicular', 	'Endodonție', 	TRUE, 	'{"conuri", "instrumente_endodontice", "pastă"}', 	'Implant dentar ICX (Germania & Elveția).jpg'),
('Retratament endodontic', 	'Refacere tratament canal anterior.', 	350, 	'90–120 min', 	'Ridicată', 	'Endo refacere', 	'Endodonție', 	TRUE, 	'{"conuri", "instrumente_endodontice", "pastă"}', 	'Implant dentar Megagen, INNO (Coreea).jpg'),
('Utilizarea microscopului ​', 	'Precizie maximă în tratamente dentare.', 	200, 	'15–20 min', 	'Ridicată', 	'Microscop endo', 	'Endodonție', 	FALSE, 	'{"Microscop_dentar", "instrumente_chirurgicale"}', 	'Implant dentar Nobel (SUA).jpg'),
('Radiografie locală', 	'Imagine a unei zone restrânse dentare.', 	35, 	'5–10 min', 	'Redusă', 	'Rx locală', 	'Radiografie (radiologie dentară)', 	FALSE, 	'{"Film_radiografic_sau_digital"}', 	'Inhalosedare cu protoxid de azot pentru copii.jpg'),
('Radiografie panoramică digitală (OPG)', 	'Imagine completă a maxilarelor și dinților.', 	100, 	'10–15 min', 	'Medie', 	'Rx panoramică', 	'Radiografie (radiologie dentară)', 	FALSE, 	'{"Film_panoramic_sau_digital"}', 	'Periaj profesional Happy Brush.jpg'),
('Tomografie completă maxilară/mandibulară', 	'Imagine 3D completă pentru diagnostic detaliat.', 	750, 	'15–20 min', 	'Ridicată', 	'CT complet', 	'Radiografie (radiologie dentară)', 	FALSE, 	'{"Tomograf", "echipamente_imagistică_3D"}', 	'Radiografie locală.jpg'),
('Tomografie parțială maxilară/mandibulară ', 	'Scanare 3D a unei zone limitate.', 	450, 	'10–15 min', 	'Ridicată', 	'CT parțial', 	'Radiografie (radiologie dentară)', 	FALSE, 	'{"Tomograf", "echipamente_imagistică_3D"}', 	'Radiografie panoramică digitală (OPG).jpg'),
('Extracție dinte monoradicular', 	'Îndepărtare dinte cu o rădăcină.', 	250, 	'20–30 min', 	'Medie', 	'Extracție simplă', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Anestezic_local", "instrumente_extracție"}', 	'Retratament endodontic.jpg'),
('Extracție dinte pluriradicular', 	'Îndepărtare molar cu mai multe rădăcini.', 	300, 	'30–45 min', 	'Ridicată', 	'Extracție molar', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Anestezic_local", "instrumente_extracție"}', 	'Rezecție apicală.jpg'),
('Extracție molar de minte', 	'Îndepărtare măsea de minte.', 	500, 	'45–60 min', 	'Ridicată', 	'Extracție minte', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Anestezic_local", "instrumente_extracție"}', 	'Sigilare dentară (dinte sănătos, prevenție carii).jpg'),
('Extracție dinte temporar', 	'Scoaterea unui dinte de lapte.', 	120, 	'15–20 min', 	'Redusă', 	'Extracție temporar', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Anestezic_local", "instrumente_extracție"}', 	'Tomografie completă .jpg'),
('Rezecție apicală', 	'Îndepărtarea vârfului unei rădăcini infectate.', 	400, 	'60–90 min', 	'Ridicată', 	'Rezecție apicală', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Instrumente_chirurgicale", "anestezic", "material_sutură"}', 	'Tomografie parțială  .jpg'),
('Drenaj abces', 	'Eliminarea puroiului dintr-o infecție.', 	100, 	'15–30 min', 	'Medie', 	'Drenaj abces', 	'Chirurgie dento-alveolară', 	TRUE, 	'{"Instrumente_chirurgicale", "drenuri", "anestezic"}', 	'Tratament carie dentară (obturatie).jpg'),
('Consultație stomatologie pediatrică', 	'Verificare orală pentru copii.', 	200, 	'15–20 min', 	'Redusă', 	'Consult copil', 	'Stomatologie pediatrică', 	FALSE, 	'{"Echipamente_evaluare"}', 	'Tratament cu alignere aparat dentar invizibil INVISALIGN Teen.jpg'),
('Consultație pedodontică de specialitate', 	'Evaluare detaliată la specialist pentru copii.', 	250, 	'20–30 min', 	'Medie', 	'Pedodont special', 	'Stomatologie pediatrică', 	FALSE, 	'{"Echipamente_evaluare"}', 	'Tratament cu alignere aparat INVISALIGN LITE.jpg'),
('Anestezie locală computerizată DentaPen / sedinta ', 	'Anestezie precisă și confortabilă.', 	90, 	'5–10 min', 	'Redusă', 	'Anestezie digitală', 	'Stomatologie pediatrică', 	FALSE, 	'{"Dispozitiv_DentaPen", "anestezic"}', 	'Tratament endodontic dinte monoradicular​.jpg'),
('Inhalosedare cu protoxid de azot pentru copii / ședință', 	'Relaxare ușoară pentru copii anxioși.', 	450, 	'15–30 min', 	'Medie', 	'Inhalosedare copil', 	'Stomatologie pediatrică', 	FALSE, 	'{"Echipamente_inhalosedare", "protoxid_de_azot"}', 	'Tratament endodontic dinte pluriradicular.jpg'),
('Sigilare dentară (dinte sănătos, prevenție carii)/dinte ', 	'Protecție împotriva cariilor pentru dinți sănătoși.', 	150, 	'10–15 min', 	'Redusă', 	'Sigilare carii', 	'Stomatologie pediatrică', 	FALSE, 	'{"Materiale_sigilante", "aplicatoare"}', 	'Tratament endodontic premolar.jpg'),
('Tratament carie dentară (obturatie)/dinte ', 	'Curățare și plombare carie dentară.', 	250, 	'30–45 min', 	'Medie', 	'Plombă dentară', 	'Stomatologie pediatrică', 	TRUE, 	'{"compozit", "amalgam", "fotopolimerizabil"}', 	'Utilizarea microscopului ​.jpg');


SELECT array_to_string(materiale_folosite, ', ')
FROM servicii;

ALTER TABLE servicii ADD COLUMN materiale_folosite_curat text;
UPDATE servicii
SET materiale_folosite_curat = array_to_string(materiale_folosite, ', ');

ALTER TABLE servicii DROP COLUMN materiale_folosite;
ALTER TABLE servicii RENAME COLUMN materiale_folosite_curat TO materiale_folosite;

