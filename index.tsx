import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Let TypeScript know that L is in the global scope and has been extended by plugins.
declare const L: any;

// --- TYPE DEFINITIONS ---
interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

// --- DATA ---
// All stations parsed from the provided document
const stationData: Station[] = [
    { id: 1, name: 'M/s. HPCL COCO', latitude: 20.63286219, longitude: 78.92587427 },
    { id: 2, name: 'M/s. Hitech Filling Station', latitude: 16.96287816, longitude: 78.72783316 },
    { id: 3, name: 'SORON JI DIESEL KENDRA', latitude: 27.87701577, longitude: 78.73482885 },
    { id: 4, name: 'BPCL COCO OUTLET', latitude: 13.50674051, longitude: 77.75805355 },
    { id: 5, name: 'Nandhi petroleums', latitude: 13.73814965, longitude: 77.78782181 },
    { id: 6, name: 'JC TYAGI filling station', latitude: 28.53507557, longitude: 78.30931451 },
    { id: 7, name: 'M/S. Sai Durga Filling Station - IOCL', latitude: 17.17644585, longitude: 78.65393753 },
    { id: 8, name: 'JAY AMBE PETROLEUM SERVICES', latitude: 20.71908792, longitude: 78.57282902 },
    { id: 9, name: 'Leela sairam filling station', latitude: 16.19935763, longitude: 81.13339567 },
    { id: 10, name: 'Lovey Drive & Fill Point', latitude: 28.59266905, longitude: 78.54830506 },
    { id: 11, name: 'MADHUSUDAN FUEL POINT', latitude: 27.77229998, longitude: 78.56936863 },
    { id: 12, name: 'SuvaranaMukhi petrol bunk', latitude: 13.50895454, longitude: 77.22726601 },
    { id: 13, name: 'Sriram Petroleum & Co', latitude: 16.88944575, longitude: 80.14893498 },
    { id: 14, name: "M/s. Sundaraiah Son's Filling Stationa", latitude: 17.16263123, longitude: 79.32644661 },
    { id: 15, name: 'Ragavendra Filling Station', latitude: 17.25130917, longitude: 80.16501437 },
    { id: 16, name: 'Madurai meenakshi agncies', latitude: 16.42067609, longitude: 81.0019483 },
    { id: 17, name: 'CGS cum Mother station', latitude: 16.6783081, longitude: 80.80559131 },
    { id: 18, name: 'Anushree Petroleum', latitude: 15.81449906, longitude: 74.49117297 },
    { id: 19, name: 'Sri Ravi Durga Agencies', latitude: 16.436886, longitude: 80.765018 },
    { id: 20, name: 'GV Filling station', latitude: 16.97819526, longitude: 78.50439403 },
    { id: 21, name: 'M/s. Bhargavi Filling Station', latitude: 17.60194866, longitude: 80.00991826 },
    { id: 22, name: 'M/s. Kanakam Service Station', latitude: 17.67982523, longitude: 78.59520537 },
    { id: 23, name: 'M/s. Neethu Petrofills', latitude: 17.14938175, longitude: 79.57728496 },
    { id: 24, name: 'M/s Highway petroplaza', latitude: 17.02118041, longitude: 79.37879217 },
    { id: 25, name: 'M/s. Shiva Sai Filling Station', latitude: 17.15741703, longitude: 79.458207 },
    { id: 26, name: 'Sri raghavendra filling station', latitude: 17.45365975, longitude: 78.13856669 },
    { id: 27, name: 'MSHSD JEYALAKSMI AGENCY', latitude: 11.16340317, longitude: 79.05670108 },
    { id: 28, name: 'M/s. Saryu Service Station.', latitude: 17.5274423, longitude: 78.66918874 },
    { id: 29, name: 'PANDAGARE PETROLEUM', latitude: 21.78520652, longitude: 78.25076706 },
    { id: 30, name: 'M/s, Hadi Filling Station', latitude: 17.28098718, longitude: 77.61185777 },
    { id: 31, name: 'M/s. Satya Sai Filling Station', latitude: 17.22593552, longitude: 79.13738184 },
    { id: 32, name: 'Shri Shyam Fuels', latitude: 22.66523892, longitude: 77.78370796 },
    { id: 33, name: 'SK FUELS', latitude: 10.31041784, longitude: 77.94513564 },
    { id: 34, name: 'M/s. Burugupalli Cgs Cum Mother station', latitude: 17.55305091, longitude: 77.90856447 },
    { id: 35, name: 'Ordinance Factory Khamaria', latitude: 23.19908787, longitude: 80.00972436 },
    { id: 36, name: 'ANNAPOORANI Service Station', latitude: 12.23698673, longitude: 79.09225108 },
    { id: 37, name: 'TSRTC Kothagudem Fuel Outlet', latitude: 17.54832017, longitude: 80.61409817 },
    { id: 38, name: 'Shankara Energy, Vijay Nagar, Jabalpur City', latitude: 23.1804845, longitude: 79.91033207 },
    { id: 39, name: 'M/s. Sharfan and Sons Filling Statlon, Pahadisha', latitude: 17.27834253, longitude: 78.47377292 },
    { id: 40, name: 'Sri balaji Bharat filling station', latitude: 16.78277722, longitude: 80.28043846 },
    { id: 41, name: 'M/s. Manohara Filling Station', latitude: 17.46922806, longitude: 78.76370743 },
    { id: 42, name: 'M/s. Bandi Lakshmi Kantham Filling Station', latitude: 17.4627019, longitude: 78.72980121 },
    { id: 43, name: 'Menaga Agency', latitude: 11.73660704, longitude: 79.00010492 },
    { id: 44, name: 'BP-Ibrahimpatnam', latitude: 16.600111, longitude: 80.511611 },
    { id: 45, name: 'GAVENDRA FILLING STATION', latitude: 27.81441715, longitude: 78.81394578 },
    { id: 46, name: 'M/s. Sri Hari Filling Station', latitude: 16.85842399, longitude: 79.57920428 },
    { id: 47, name: 'Kiranya filling station', latitude: 16.44761146, longitude: 80.68750486 },
    { id: 48, name: 'M/s. Sri Ramana Filling Station', latitude: 17.97024368, longitude: 79.49691245 },
    { id: 49, name: 'NATARAJA AGENCY', latitude: 11.26187557, longitude: 78.89650825 },
    { id: 50, name: 'SWAYAMBHU HANUMAN PETROLEUM', latitude: 15.68869218, longitude: 74.35718437 },
    { id: 51, name: 'M/s. Vani Auto Service', latitude: 17.67215052, longitude: 80.89011948 },
    { id: 52, name: 'sri ala sai fuel station', latitude: 16.65315833, longitude: 78.00698667 },
    { id: 53, name: 'Shree Renuka Highway Petroleum', latitude: 15.77746524, longitude: 74.63575281 },
    { id: 54, name: 'Shri Sai Petroleum, Bharat Petroleum, Petrol Pu', latitude: 21.63032088, longitude: 78.47381369 },
    { id: 55, name: 'M/s. SVR Enterprises.', latitude: 17.0888986, longitude: 78.2389803 },
    { id: 56, name: 'Krishna Agency', latitude: 10.69472602, longitude: 78.73482601 },
    { id: 57, name: 'Sha Gulabchand jivavat & co', latitude: 16.42830302, longitude: 81.01901482 },
    { id: 58, name: 'Divya Lakshmi Ganapathi filling station', latitude: 17.26416551, longitude: 80.14623501 },
    { id: 59, name: 'Sri Sai Balaji Filling Point, HPCL', latitude: 17.05515452, longitude: 78.21103839 },
    { id: 60, name: 'BP GAJRAULA', latitude: 28.838226, longitude: 78.275494 },
    { id: 61, name: 'Nava Durga Auto fills', latitude: 17.25732962, longitude: 80.11932797 },
    { id: 62, name: 'Sai Roadways', latitude: 16.60342976, longitude: 80.50135801 },
    { id: 63, name: 'Gulzar Petroleum', latitude: 22.05846921, longitude: 78.95921562 },
    { id: 64, name: 'M/s. SLNS Filing Station', latitude: 17.52708442, longitude: 78.92707821 },
    { id: 65, name: 'Sri Balaji tractor service station', latitude: 16.54796362, longitude: 80.81700838 },
    { id: 66, name: 'Mother station', latitude: 16.55737586, longitude: 80.67461953 },
    { id: 67, name: 'vadakaraiamman Agencies', latitude: 10.98146712, longitude: 78.03069928 },
    { id: 68, name: 'Shri Guru Arjan Dev Filling Station (BPCL)', latitude: 31.54747966, longitude: 74.8906117 },
    { id: 69, name: 'M/s. Sai Ram Filling Station', latitude: 17.26480328, longitude: 78.83426836 },
    { id: 70, name: 'CGS CUM MOTHER STATION', latitude: 15.91002144, longitude: 74.54223371 },
    { id: 71, name: 'M/s. Elvee Petroplaza', latitude: 17.29258074, longitude: 78.75143919 },
    { id: 72, name: 'M/s. TSSP Filling Station', latitude: 17.91956933, longitude: 79.59643818 },
    { id: 73, name: 'M/s. Megha Gas MS', latitude: 17.9515969, longitude: 79.75175243 },
    { id: 74, name: 'Skyline Shettihalli', latitude: 13.31071701, longitude: 77.12695983 },
    { id: 75, name: 'M/s. Kodad CGS cum MS', latitude: 17.01772234, longitude: 79.99372764 },
    { id: 76, name: 'DATTOPANT AUTOMOBILE', latitude: 15.86243141, longitude: 74.53017274 },
    { id: 77, name: 'Rahaman fuels station', latitude: 16.33494762, longitude: 80.91869998 },
    { id: 78, name: 'Srinivasa Service Station HP Petrol Bunk', latitude: 13.37188021, longitude: 77.11176572 },
    { id: 79, name: 'AMMALU AGENCY', latitude: 10.13715795, longitude: 79.22263557 },
    { id: 80, name: 'HINDUSTAN SERVICE STATION', latitude: 28.78030123, longitude: 78.17990546 },
    { id: 81, name: 'M/s. Perala Filling Station', latitude: 17.463747, longitude: 78.743966 },
    { id: 82, name: 'M/s. SVR Fuel Station', latitude: 17.02099634, longitude: 78.19764196 },
    { id: 83, name: 'M/s. Kamala Filling Station', latitude: 16.71344545, longitude: 78.9884267 },
    { id: 84, name: 'HPCL COCO', latitude: 16.42918306, longitude: 80.77248451 },
    { id: 85, name: 'M/s. Kanaka Durga Filling Station', latitude: 17.06494241, longitude: 78.47306284 },
    { id: 86, name: 'Siva subramanyeswara Agencies', latitude: 16.24657364, longitude: 81.14443855 },
    { id: 87, name: 'M/s. Sai Ram Filling Station', latitude: 17.16714516, longitude: 77.87138135 },
    { id: 88, name: 'M/s. Sri Venkateshwara Swamy Filling Station', latitude: 16.98214132, longitude: 80.00353966 },
    { id: 89, name: 'Prakash Petroleum', latitude: 15.68471023, longitude: 74.71777171 },
    { id: 90, name: 'shamsabad airport filling station', latitude: 17.24949802, longitude: 78.47388609 },
    { id: 91, name: 'Sri Maruthi Enterprises', latitude: 13.49418064, longitude: 77.75417454 },
    { id: 92, name: 'M.P. KARIKAZI', latitude: 16.260998, longitude: 74.4787 },
    { id: 93, name: 'Pavan siva sai Filling Station', latitude: 16.63227589, longitude: 80.95531776 },
    { id: 94, name: 'Kahali Automobile', latitude: 24.46193, longitude: 74.88346 },
    { id: 95, name: 'M/s. MCGDPL CGS cum MS', latitude: 17.40071287, longitude: 79.02132061 },
    { id: 96, name: 'Highway 79 Gas Station | Bharat Petroleum Co', latitude: 16.78908622, longitude: 78.13887939 },
    { id: 97, name: 'Sai Filling Station, IOCL, Yacharam', latitude: 17.05620165, longitude: 78.66667934 },
    { id: 98, name: 'Sarkar Filling Station', latitude: 28.859709, longitude: 78.470618 },
    { id: 99, name: 'Monarch Filling Station', latitude: 20.301504, longitude: 82.751672 },
    { id: 100, name: 'M/s. Sri Prataprudra Filling Station', latitude: 17.9998701, longitude: 79.5555608 },
    { id: 101, name: 'Barde Road lines', latitude: 15.92062829, longitude: 74.5253679 },
    { id: 102, name: 'Shubam Petroliums', latitude: 16.7560673, longitude: 77.14356335 },
    { id: 103, name: 'DAMODARA MUDALIAR & CO', latitude: 11.93468699, longitude: 79.48431429 },
    { id: 104, name: 'OM SAI KRISHNA PETROLEUM', latitude: 15.88717597, longitude: 74.51588244 },
    { id: 105, name: 'Akshaya filling station', latitude: 16.76142703, longitude: 80.8583145 },
    { id: 106, name: 'Kanuru DBS', latitude: 16.48453185, longitude: 80.68515377 },
    { id: 107, name: 'Hazi gaffer filling station', latitude: 16.74736014, longitude: 77.99260811 },
    { id: 108, name: 'Maruthi filling station', latitude: 16.55290157, longitude: 80.61751737 },
    { id: 109, name: 'M/s. TS Agro Karshak FS', latitude: 17.07254515, longitude: 79.26219636 },
    { id: 110, name: 'Gupta Fules (NH 46)', latitude: 22.21291287, longitude: 77.89777123 },
    { id: 111, name: 'APSRTC Depot_(IBM)', latitude: 16.59027981, longitude: 80.5201861 },
    { id: 112, name: 'DBS, Vijayawada Bus stand', latitude: 16.50771823, longitude: 80.61226019 },
    { id: 113, name: 'M/s Shree Bishnu F/S', latitude: 20.716101, longitude: 83.494246 },
    { id: 114, name: 'Dolphin Auto Service Station', latitude: 16.38440434, longitude: 80.82461433 },
    { id: 115, name: 'M/s. Syed Imtiyazuddin G.Patel', latitude: 17.29694822, longitude: 77.98643715 },
    { id: 116, name: 'Sri Venkateshwar Filling Station', latitude: 17.58861639, longitude: 80.68347351 },
    { id: 117, name: 'Shri Ganesham Associates', latitude: 24.52328553, longitude: 76.17348373 },
    { id: 118, name: 'Paul Choudhary Brothers', latitude: 23.239423, longitude: 79.968421 },
    { id: 119, name: 'Ansh Filling Station', latitude: 28.4038235, longitude: 78.63971188 },
    { id: 120, name: 'BP PARITALA', latitude: 16.62300278, longitude: 80.45253115 },
    { id: 121, name: 'SRI BALAJI AGENCY', latitude: 12.223166, longitude: 79.64762 },
    { id: 122, name: 'Kiwad Petroleum', latitude: 16.424976, longitude: 74.58523 },
    { id: 123, name: 'A.S. FILLING STATION', latitude: 31.31499857, longitude: 74.95224304 },
    { id: 124, name: 'Shri Pashupatibath Fuels', latitude: 24.095711, longitude: 75.051728 },
    { id: 125, name: 'Rajesh Pal Singh Chourgaratiya', latitude: 22.16675319, longitude: 79.53484096 },
    { id: 126, name: 'MARHANA NH 54 FUEL STATION', latitude: 31.19551854, longitude: 74.95445648 },
    { id: 127, name: 'Totabai service station', latitude: 17.33927092, longitude: 78.31799444 },
    { id: 128, name: 'SAI VENKATA KRISHNA FLG STN', latitude: 16.75610109, longitude: 80.64851019 },
    { id: 129, name: 'HPCL-BALAJI FUELS & SERVICE POINT', latitude: 13.75518584, longitude: 76.88123133 },
    { id: 130, name: 'Kanchi Seetharamaiah & Sons', latitude: 17.10118051, longitude: 80.61491481 },
    { id: 131, name: 'Sri sai Durga Servicing station Pamarru', latitude: 16.32583934, longitude: 80.95200321 },
    { id: 132, name: 'Maa Bijasan Petrol Pump', latitude: 23.5132861, longitude: 77.8404162 },
    { id: 133, name: 'SHREE MAHALAXMI PETROLEUM', latitude: 15.85759799, longitude: 74.53647235 },
    { id: 134, name: 'COCO Thimmapur', latitude: 17.15570366, longitude: 78.29243584 },
    { id: 135, name: 'M/s. BP Medchal', latitude: 17.66466985, longitude: 78.48903824 },
    { id: 136, name: 'M/s. GVV Filling Station', latitude: 17.1362063, longitude: 79.63325035 },
    { id: 137, name: 'MANAKCHAND JETHAMAL MALOO', latitude: 20.22000794, longitude: 79.01889255 },
    { id: 138, name: 'Prashanthi Filling Station', latitude: 17.25030471, longitude: 80.13605782 },
    { id: 139, name: 'Saradhi filling station', latitude: 15.9852429, longitude: 77.97500977 },
    { id: 140, name: 'M/s. Ap Prison', latitude: 17.994349, longitude: 79.5914386 },
    { id: 141, name: 'M/s. Prabhu Leela Filling Station', latitude: 17.63158137, longitude: 78.57036661 },
    { id: 142, name: 'M/s. Sri Balaji Service Station', latitude: 17.66705132, longitude: 79.08804682 },
    { id: 143, name: 'Anantha Filling Station', latitude: 24.532829, longitude: 74.810314 },
    { id: 144, name: 'Commercial Auto Mobile Pvt Ltd', latitude: 23.15995443, longitude: 79.86547107 },
    { id: 145, name: 'SRI MANJUNATHA SERVICE STATION', latitude: 13.0315857, longitude: 77.0816345 },
    { id: 146, name: 'M/s. V.M. Kotpalliwar', latitude: 19.9723896, longitude: 79.2870493 },
    { id: 147, name: 'Ayyappa filling station', latitude: 16.67434778, longitude: 78.49841473 },
    { id: 148, name: 'Narmada Filling Centre', latitude: 23.11946324, longitude: 79.02931431 },
    { id: 149, name: 'Gowri filling station', latitude: 16.4447754, longitude: 80.75301806 },
    { id: 150, name: 'Sri Sai Filling Station', latitude: 16.91529706, longitude: 80.36614446 },
    { id: 151, name: 'Mother station', latitude: 16.47692671, longitude: 80.68017594 },
    { id: 152, name: 'CIKI VAHANA AGENCY', latitude: 10.44362889, longitude: 77.53064608 },
    { id: 153, name: 'DODO', latitude: 16.55140795, longitude: 80.61715011 },
    { id: 154, name: 'RGIA Airport FS', latitude: 17.24181059, longitude: 78.43048652 },
    { id: 155, name: 'The krishna district lorry owners association', latitude: 16.5111281, longitude: 80.73220461 },
    { id: 156, name: 'Mother Station Koya', latitude: 17.1413896, longitude: 78.27147987 },
    { id: 157, name: 'MEGHA CGS cum Mother station', latitude: 13.3578582, longitude: 77.0503174 },
    { id: 158, name: 'SRI RANGA SERVICE STATION', latitude: 13.41866846, longitude: 76.61739982 },
    { id: 159, name: 'MEGHAGAS MOTHER STATION, RAJAPUR', latitude: 16.83894153, longitude: 78.15618741 },
    { id: 160, name: 'Maa Petroleum - IOCL', latitude: 23.65003817, longitude: 78.10249901 },
    { id: 161, name: 'CGS- Tarn Taran', latitude: 31.47784277, longitude: 74.9558465 },
    { id: 162, name: 'Maan Filling Station (Indian Oil)', latitude: 31.28630059, longitude: 74.84700983 },
    { id: 163, name: 'Gita Filling Station', latitude: 24.17679963, longitude: 78.14298997 },
    { id: 164, name: 'MPVR Petroleum', latitude: 10.73768821, longitude: 79.10515616 },
    { id: 165, name: 'Tirumalagutta service station', latitude: 16.75750409, longitude: 77.97569578 },
    { id: 166, name: 'TS Agro', latitude: 16.36454424, longitude: 78.05038403 },
    { id: 167, name: 'Farhan Filling Station', latitude: 17.54696072, longitude: 78.61529938 },
    { id: 168, name: 'Sunitha Filling Station', latitude: 18.38009805, longitude: 79.8393618 },
    { id: 169, name: 'COCO BPCL', latitude: 16.500883, longitude: 74.33457 },
    { id: 170, name: 'BUTALI PETROLEUM', latitude: 16.72722402, longitude: 75.07600171 },
    { id: 171, name: 'RAMESHWAR PETROLEUM', latitude: 15.97831845, longitude: 74.51032191 },
    { id: 172, name: 'RSR Fuel Station', latitude: 13.70606725, longitude: 77.49844451 },
    { id: 173, name: 'L-CNG', latitude: 20.27558508, longitude: 83.11929075 },
    { id: 174, name: 'SMRUDDHI PETROLEUM', latitude: 20.81524357, longitude: 78.688231 },
    { id: 175, name: 'M/s. RK Petromart', latitude: 16.85687444, longitude: 78.52949173 },
    { id: 176, name: 'sankar filling station', latitude: 16.89549068, longitude: 80.12602974 },
    { id: 177, name: 'Surya & sons filling station', latitude: 16.12268305, longitude: 80.9453564 },
    { id: 178, name: 'HPCL COCO', latitude: 16.69308378, longitude: 80.37291391 },
    { id: 179, name: 'Sri Rama Filling Station', latitude: 16.60255634, longitude: 77.73349335 },
    { id: 180, name: 'Raghuvamsi filling station', latitude: 15.88436205, longitude: 78.0162894 },
    { id: 181, name: 'Sengipatti Petroleum Centre', latitude: 10.72550987, longitude: 78.98051783 },
    { id: 182, name: 'Maa Baglamukhi Fuels', latitude: 23.92753406, longitude: 76.10093408 },
    { id: 183, name: 'Vanshika Fuel Filling Centre', latitude: 22.73662175, longitude: 77.73470047 },
    { id: 184, name: 'Rudraksha Petroleum', latitude: 23.84176978, longitude: 78.73061712 },
    { id: 185, name: 'M/s. Durga Bhawani Filling Station', latitude: 17.1512294, longitude: 79.6062123 },
    { id: 186, name: 'DKR Alivelamma Filling station', latitude: 16.58652646, longitude: 77.96719138 },
    { id: 187, name: 'Dhanlaxmi Petroleum, Parasia Road', latitude: 22.06166702, longitude: 78.91983693 },
    { id: 188, name: 'Pitalia Fuel Station', latitude: 23.535549, longitude: 77.838941 },
    { id: 189, name: 'M/s. Sri Venkateswara FS', latitude: 17.84521201, longitude: 79.36426857 },
    { id: 190, name: 'Sharda Services-Bharat Petroleum, Petrol Pump', latitude: 22.003813, longitude: 77.676563 },
    { id: 191, name: 'MT Oil Company', latitude: 28.85624319, longitude: 78.46990144 },
    { id: 192, name: 'Sri Murgan Agency', latitude: 12.68742113, longitude: 79.27293016 },
    { id: 193, name: 'DN filling station', latitude: 28.39733671, longitude: 78.63232589 },
    { id: 194, name: 'Shree Renuka Petroleum', latitude: 16.23923983, longitude: 74.6542596 },
    { id: 195, name: 'Mahalaxmi Petroleum', latitude: 16.15253086, longitude: 74.51825532 },
    { id: 196, name: 'Jugal Auto Agencies', latitude: 23.91583, longitude: 77.89495 },
    { id: 197, name: 'PONNSANKAR AGENCIES.', latitude: 10.93411, longitude: 78.054802 },
    { id: 198, name: 'ADHOC BHARANI KUMARAN AGENCY(OLD - CO', latitude: 10.94434, longitude: 78.115659 },
    { id: 199, name: 'HAD SHAHID BALDEV SINGH FILLING STATION', latitude: 31.37100528, longitude: 75.12577521 },
    { id: 200, name: 'SAT FUEL PARK', latitude: 13.75778175, longitude: 77.78667479 },
    { id: 201, name: 'SMR Fuel Staion', latitude: 13.24587533, longitude: 77.92248731 },
    { id: 202, name: 'M/S H K Sachdeva Filling Station', latitude: 19.9322077, longitude: 83.171407 },
    { id: 203, name: 'Shree Gayatri Traders', latitude: 20.00000581, longitude: 79.24693986 },
    { id: 204, name: 'Ramya Service Station', latitude: 12.26508103, longitude: 79.6835101 },
    { id: 205, name: 'R M Gowda', latitude: 13.02715496, longitude: 77.04852525 },
    { id: 206, name: 'S.C.Panchakattimath', latitude: 15.94668712, longitude: 75.3047179 },
    { id: 207, name: 'M/s. Adhoc Rama narsimha Filling Station', latitude: 17.4594686, longitude: 79.4577824 },
    { id: 208, name: 'SRI GANGA TRANSPORT', latitude: 11.29886247, longitude: 78.91000538 },
    { id: 209, name: 'M/s. Thirumala Service Station', latitude: 18.0459033, longitude: 79.5337802 },
    { id: 210, name: 'Om Ashapura Petroleum', latitude: 21.71347182, longitude: 79.44156614 },
    { id: 211, name: 'M/s. Arfath Filling Station', latitude: 17.1188089, longitude: 78.26949874 },
    { id: 212, name: 'M/s. Shree Bandeshwara Filling Station', latitude: 17.05144784, longitude: 77.53588586 },
    { id: 213, name: 'Durga Filling Station', latitude: 28.77457453, longitude: 78.33923274 },
    { id: 214, name: 'M/s. Vimala Patil Filling Statlon, Paddashapur', latitude: 17.21171858, longitude: 78.33542297 },
    { id: 215, name: 'GANAPATHI AGENCIES', latitude: 12.40517494, longitude: 79.1031364 },
    { id: 216, name: 'Jagdambey Auto Fillers', latitude: 31.17836871, longitude: 74.92786409 },
    { id: 217, name: 'SHIKHA FILLING STATION', latitude: 27.83961527, longitude: 78.7924331 },
    { id: 218, name: 'MHKS Petrol Pump', latitude: 22.07197226, longitude: 79.54277774 },
    { id: 219, name: 'Wainganga Petroleum', latitude: 21.82712244, longitude: 80.20880343 },
    { id: 220, name: 'AGARWAL TRADERS BPCL PETROL PUMP', latitude: 23.93548715, longitude: 75.61747351 },
    { id: 221, name: 'Sri Kasturi Ranga Agencies', latitude: 10.2606454, longitude: 78.1129999 },
    { id: 222, name: 'M/s. Vamshi Filling Station', latitude: 17.2586854, longitude: 78.8707185 },
    { id: 223, name: 'Adoc Rizwan MV Agency', latitude: 10.61034741, longitude: 78.55361057 },
    { id: 224, name: 'HIGHWAY GLORY', latitude: 21.8864658, longitude: 77.90438775 },
    { id: 225, name: 'BURGARH AGENCIES', latitude: 12.12681831, longitude: 79.21462266 },
    { id: 226, name: 'Uttara Enterprises', latitude: 16.9103555, longitude: 78.17804016 },
    { id: 227, name: 'LAKSHMI PETROL BUNK', latitude: 10.934953, longitude: 78.413536 },
    { id: 228, name: 'RDS Petroleum', latitude: 22.43857261, longitude: 77.83882986 },
    { id: 229, name: 'Mann Motors', latitude: 22.19228873, longitude: 78.75727591 },
    { id: 230, name: 'SMT. LINGAMMAL RAMARAJU SHASTRA PRA', latitude: 11.37447849, longitude: 79.22256568 },
    { id: 231, name: 'M/s. Chandra Eshwara FS', latitude: 17.632837, longitude: 79.027418 },
    { id: 232, name: 'RAJPOOT FILLING STATION', latitude: 27.76628413, longitude: 78.62015788 },
    { id: 233, name: 'Shiva Automobile', latitude: 22.08289002, longitude: 78.96929962 },
    { id: 234, name: 'Janapriya filling station', latitude: 17.58438841, longitude: 80.32965485 },
    { id: 235, name: 'Serajpur Autogas Centre', latitude: 10.7558944, longitude: 79.13993326 },
    { id: 236, name: 'HPCL-HVG FUEL STATION', latitude: 12.94489467, longitude: 77.02719452 },
    { id: 237, name: 'M/s.Bhahuujan FS, Dharur.', latitude: 17.31282158, longitude: 77.78606921 },
    { id: 238, name: 'AA FUEL STATION', latitude: 13.31464311, longitude: 77.97998183 },
    { id: 239, name: 'HPCL-Sri Sai Shiva Fuel Station', latitude: 12.99790182, longitude: 76.93992617 },
    { id: 240, name: 'Shekhar Petroleum', latitude: 20.1670815, longitude: 83.20422931 },
    { id: 241, name: 'SS Enterprise', latitude: 16.16691765, longitude: 77.95030192 },
    { id: 242, name: 'NLK filling station', latitude: 16.33660995, longitude: 77.94858238 },
    { id: 243, name: 'M/S VENKATESWARA AGENCIES', latitude: 12.641212, longitude: 79.16589 },
    { id: 244, name: 'Bhanu Petroleum', latitude: 23.20032281, longitude: 79.89072033 },
    { id: 245, name: 'M/s Sharanadi Petro Works Company', latitude: 23.14241076, longitude: 79.42097846 },
    { id: 246, name: 'Aulakh filling centre', latitude: 29.04763157, longitude: 78.5311388 },
    { id: 247, name: 'Rajabpura filling station', latitude: 28.83652039, longitude: 78.35868241 },
    { id: 248, name: 'Premium filling Station', latitude: 28.74133191, longitude: 78.28009452 },
    { id: 249, name: 'Rama Filling Station', latitude: 28.60859618, longitude: 78.27656178 },
    { id: 250, name: 'Jain Petroleum', latitude: 22.93730011, longitude: 81.07934138 },
    { id: 251, name: 'MCGDPL- Mother Station-Mathur', latitude: 10.70066722, longitude: 78.73631213 },
    { id: 252, name: 'Lakshmi Venkateshwara Fuel Station', latitude: 13.3456452, longitude: 77.23169388 },
    { id: 253, name: 'Z S Vishindasani', latitude: 23.52773282, longitude: 80.84755366 },
    { id: 254, name: 'M/S SNEHS F/S', latitude: 20.29895781, longitude: 83.1574735 },
    { id: 255, name: 'Hamara Pump Rajendra Singh', latitude: 27.71715793, longitude: 78.93436408 },
    { id: 256, name: 'MKSK Saraf', latitude: 24.03517365, longitude: 78.95892252 },
    { id: 257, name: 'Gangotri Automobiles', latitude: 23.81594044, longitude: 79.41231486 },
    { id: 258, name: 'Star petroleum', latitude: 10.06346704, longitude: 78.78654233 },
    { id: 259, name: 'M/s. JS Fuels Filling Station', latitude: 17.06712285, longitude: 78.20509739 },
    { id: 260, name: 'AMMAN AGRO FUELS', latitude: 10.07838822, longitude: 79.04187569 },
    { id: 261, name: 'Satija Highway Fuels', latitude: 22.0229506, longitude: 78.92945603 },
    { id: 262, name: 'SRI KRISHNA FUELS', latitude: 19.63592149, longitude: 83.48251475 },
    { id: 263, name: 'Shri Balaji Petrol Pump', latitude: 28.27203789, longitude: 78.4210529 },
    { id: 264, name: 'Kalpatru service station', latitude: 13.26333874, longitude: 76.45312929 },
    { id: 265, name: 'Sahdev fuels', latitude: 19.91280656, longitude: 83.11146493 },
    { id: 266, name: 'Shree Balaji Tirupati Fuels', latitude: 23.71889669, longitude: 76.02067367 },
    { id: 267, name: 'SRI THAYARS AGENCYS', latitude: 10.806617, longitude: 77.934397 },
    { id: 268, name: 'Siddarth Petrol Pump', latitude: 28.26946427, longitude: 78.41347909 },
    { id: 269, name: 'Sreekanth Energy', latitude: 13.40609298, longitude: 78.03201182 },
    { id: 270, name: 'Senthil Service Station', latitude: 10.3711005, longitude: 77.9513684 },
    { id: 271, name: 'Kalyani Commercials Ltd', latitude: 24.60385009, longitude: 76.12321601 },
    { id: 272, name: 'HP PETROL PUMP - KONGU AUTO FUELS', latitude: 10.959104, longitude: 77.931904 },
    { id: 273, name: 'M/s. Charminar Service Station', latitude: 17.2430307, longitude: 78.36810362 },
    { id: 274, name: 'Nagapooja', latitude: 13.49256302, longitude: 77.51363589 },
    { id: 275, name: 'E.E. Dalal & Company', latitude: 23.95411331, longitude: 75.10088328 },
    { id: 276, name: 'Valuvar Agencies.', latitude: 10.82207493, longitude: 77.95153473 },
    { id: 277, name: 'Thiruvarangam Agencies', latitude: 10.46679348, longitude: 77.69181337 },
    { id: 278, name: 'Anil Transport Company', latitude: 23.15512177, longitude: 79.84704085 },
    { id: 279, name: 'Datta Petroleum', latitude: 23.515274, longitude: 77.794566 },
    { id: 280, name: 'Vasu automobiles', latitude: 16.50983658, longitude: 76.75851448 },
    { id: 281, name: 'Shikharchand & Company', latitude: 23.09966727, longitude: 79.89361382 },
    { id: 282, name: 'MCGDPL-Mother Station-Viralimalai', latitude: 10.61029072, longitude: 78.55476005 },
    { id: 283, name: 'Bajaj Filling Station', latitude: 23.78221852, longitude: 75.80186268 },
    { id: 284, name: 'Sri Narayana Agencies', latitude: 11.16954364, longitude: 78.85972048 },
    { id: 285, name: 'ROSHAN LAL FILLING STATION-BHARAT PETROL', latitude: 31.46132857, longitude: 74.93805627 },
    { id: 286, name: 'THIRUPATHI AGENCY', latitude: 11.3720358, longitude: 78.79391948 },
    { id: 287, name: 'SREE MURUGAN AGENCY', latitude: 10.95151117, longitude: 77.84119327 },
    { id: 288, name: 'Veera teza filling station', latitude: 24.420034, longitude: 76.53965756 },
    { id: 289, name: 'RT PATIL', latitude: 15.97244032, longitude: 75.02605567 },
    { id: 290, name: 'Shirsi Sai Enterprises', latitude: 13.43006926, longitude: 77.75950555 },
    { id: 291, name: 'Porwal Filling Station', latitude: 24.483854, longitude: 76.310192 },
    { id: 292, name: 'RANVEER PETROLEUM', latitude: 16.05448646, longitude: 74.51280534 },
    { id: 293, name: 'RAM AGENCY', latitude: 11.19265, longitude: 78.873589 },
    { id: 294, name: 'PUGAZH AGENCY', latitude: 11.257268, longitude: 79.182445 },
    { id: 295, name: 'Sushmaa Gas Station', latitude: 28.83820505, longitude: 78.28330696 },
    { id: 296, name: 'Z-fuel Station', latitude: 28.83802322, longitude: 78.30266417 },
    { id: 297, name: 'SHRI GIRIRAJ FILLING STATION', latitude: 27.84499176, longitude: 78.69081646 },
    { id: 298, name: 'RR Jaiswal - IOCL', latitude: 22.6970174, longitude: 78.19073345 },
    { id: 299, name: 'RD Gopichand - IOCL', latitude: 22.62944865, longitude: 77.7746023 },
    { id: 300, name: 'Minakshi Chidambaram Fuels', latitude: 11.23655842, longitude: 78.88320512 },
    { id: 301, name: 'Megha City Gas Distribution Private Limited', latitude: 10.21158361, longitude: 78.27584928 },
    { id: 302, name: 'SK B & CO (LOCK NO -11006)', latitude: 10.34424272, longitude: 77.99022763 },
    { id: 303, name: 'M/s. Akshara Filling Statlon,chevella', latitude: 17.31606956, longitude: 78.13438473 },
    { id: 304, name: 'M/s. Kalyani Filling Station', latitude: 18.0490712, longitude: 79.6615509 },
    { id: 305, name: 'M/s. Padmalaya Service Station( Deshpande Ag', latitude: 20.25517213, longitude: 79.01581216 },
    { id: 306, name: 'Gaurav Petroleum', latitude: 20.03256003, longitude: 79.18380231 },
    { id: 307, name: 'L-CNG', latitude: 20.0189202, longitude: 79.20385437 },
    { id: 308, name: 'Rasia Agency', latitude: 10.35585369, longitude: 78.84509015 },
    { id: 309, name: 'SLN Filling Station', latitude: 16.46377716, longitude: 78.34574602 },
    { id: 310, name: 'Tuba Filling Sstation, BPCL', latitude: 17.189423, longitude: 78.30866 },
    { id: 311, name: 'Baba Bhudha Ji Filling Station, BPCL', latitude: 31.4122772, longitude: 74.73588029 },
    { id: 312, name: 'M/s. Sri Venkateshwara Filling Station', latitude: 17.17339862, longitude: 78.13519988 },
    { id: 313, name: 'Srinivasa Filling Station', latitude: 16.86687444, longitude: 78.1629498 },
    { id: 314, name: 'PSA Fuel Station', latitude: 10.15214931, longitude: 78.76425533 },
    { id: 315, name: 'RT Parvendramani & Company', latitude: 10.26837467, longitude: 77.62077116 },
    { id: 316, name: 'Vihan Fuel park', latitude: 13.43975746, longitude: 77.71305044 },
    { id: 317, name: 'M/s. Manasapally Filling Station', latitude: 17.13895297, longitude: 78.37502438 },
    { id: 318, name: 'VRK AGENCIES', latitude: 10.23796663, longitude: 77.81930067 },
    { id: 319, name: 'Sawarkar Petroleum', latitude: 20.06593845, longitude: 79.6746006 },
    { id: 320, name: 'M/s. Venkata sai Filling Station', latitude: 16.69569761, longitude: 78.93419986 },
    { id: 321, name: 'SREE VENKATESWARA PETROLIUMS', latitude: 11.11395, longitude: 79.07224 },
    { id: 322, name: 'SriRanga Agencies', latitude: 10.89132242, longitude: 79.18869019 },
    { id: 323, name: 'M/s. Satya Krishna Filling Station', latitude: 17.28400168, longitude: 77.56680316 },
    { id: 324, name: 'M/s. GM Patel Filling Station', latitude: 17.09716169, longitude: 78.02939733 },
    { id: 325, name: 'TRS Fuel Park', latitude: 13.39570404, longitude: 77.74109516 },
    { id: 326, name: 'M/s. Vishnu Vardhan Reddy Filling Station', latitude: 17.63008954, longitude: 78.51886259 },
    { id: 327, name: 'M/S. HP PUMP', latitude: 17.28564026, longitude: 79.09498063 },
    { id: 328, name: 'Rani kamalambal Agency', latitude: 10.38208473, longitude: 78.80749095 },
    { id: 329, name: 'Chandra Agency HPCL', latitude: 10.33816964, longitude: 77.84842157 },
    { id: 330, name: 'M/s. Srinivasa Filling Station', latitude: 17.7238536, longitude: 79.1712849 },
    { id: 331, name: 'lalit filling station', latitude: 20.26502335, longitude: 83.12364247 },
    { id: 332, name: 'Vasantham Agency', latitude: 10.39655418, longitude: 78.78778355 },
    { id: 333, name: 'Maruthi filling station', latitude: 16.56670759, longitude: 78.68576663 },
    { id: 334, name: 'BP Rangareddy guda petrol pump', latitude: 16.89708622, longitude: 78.17392848 },
    { id: 335, name: 'M/s. Sri Balaji Filling Station', latitude: 16.82962039, longitude: 79.47910462 },
    { id: 336, name: 'SP Petroleum', latitude: 10.37206895, longitude: 79.20794289 },
    { id: 337, name: 'Pise Petroleum', latitude: 20.50075042, longitude: 79.38599373 },
    { id: 338, name: 'M/s. Lalitha Parameswari Filling Station', latitude: 17.45193182, longitude: 78.12558306 },
    { id: 339, name: 'Sulochana Filling Station, Kacharam', latitude: 17.253871, longitude: 78.305547 },
    { id: 340, name: 'Shri Baba Farid Petroleum', latitude: 20.61311807, longitude: 79.86909497 },
    { id: 341, name: 'Amadabakula Filling Station', latitude: 16.33403079, longitude: 77.94970029 },
    { id: 342, name: 'TSSP 10 th battalion filling station', latitude: 16.15223585, longitude: 77.91560502 },
    { id: 343, name: 'RAMJAY PETROL BUNK', latitude: 11.14684, longitude: 78.84543 },
    { id: 344, name: 'Ebenezer fuels', latitude: 10.77423315, longitude: 79.12102758 },
    { id: 345, name: 'SHANTHI TRANSPORT SERVICES', latitude: 11.11135022, longitude: 79.16580476 },
    { id: 346, name: 'SMT AGENCIES', latitude: 11.11684, longitude: 79.117 },
    { id: 347, name: 'Bombay Seth automobiles', latitude: 16.72101655, longitude: 76.80417588 },
    { id: 348, name: 'Govardhini Enterprises', latitude: 11.03818836, longitude: 79.41044047 },
    { id: 349, name: 'RAMCO WELFARE TRUST', latitude: 11.17235066, longitude: 79.10033838 },
    { id: 350, name: 'SHABARINATHAN & CO.', latitude: 11.37076096, longitude: 79.22179465 },
    { id: 351, name: 'PVR Fuel Station', latitude: 16.74951822, longitude: 78.1494752 },
    { id: 352, name: 'M/S. HPCL Pump', latitude: 17.45582606, longitude: 79.25697657 },
    { id: 353, name: 'Sri Sevugamoorthi Petroleum', latitude: 10.18320135, longitude: 78.4335773 },
    { id: 354, name: 'Laxmi Agency', latitude: 10.5508219, longitude: 78.77955353 },
    { id: 355, name: 'VIMAL AGENCY', latitude: 11.27712382, longitude: 79.48796632 },
    { id: 356, name: 'Sampath Filling Station', latitude: 16.60231313, longitude: 76.87922668 },
    { id: 357, name: 'Susee', latitude: 10.16809497, longitude: 77.76324594 },
    { id: 358, name: 'M/s. Parnika Petro Mart', latitude: 17.63008312, longitude: 78.44501013 },
    { id: 359, name: 'V.S. FUELSS', latitude: 10.96719, longitude: 78.05006 },
    { id: 360, name: 'Naruvizhi Ambal Petrol Station', latitude: 10.09330938, longitude: 78.76389591 },
    { id: 361, name: 'sri sainath fuel Park', latitude: 16.72540281, longitude: 78.40970159 },
    { id: 362, name: 'BALAJI SERVICE STATION', latitude: 27.6853505, longitude: 79.00109078 },
    { id: 363, name: 'Bakiya Fuel Station', latitude: 9.83207903, longitude: 78.24834302 },
    { id: 364, name: 'HiTech Fuel Point', latitude: 16.75292728, longitude: 78.02645253 },
    { id: 365, name: 'Siva Sakthi Fuel Stations', latitude: 10.1129326, longitude: 78.76138122 },
    { id: 366, name: 'M/S. JAGDAMBA Filling Station', latitude: 16.88672677, longitude: 79.69673717 },
    { id: 367, name: 'Varalakshmi Petro Mart', latitude: 17.21889265, longitude: 80.29745345 },
    { id: 368, name: 'Lakshmi Narsimha Fuels', latitude: 17.96608671, longitude: 79.62921756 },
    { id: 369, name: 'M/s. Padmavathi Filling Station', latitude: 17.34538302, longitude: 78.82418021 },
    { id: 370, name: 'Devendra Kumar Jain', latitude: 23.83833964, longitude: 78.72497194 },
    { id: 371, name: 'Kollangkali Fuels', latitude: 10.04133567, longitude: 78.76272442 },
    { id: 372, name: 'M/s. Ebrahimjee Filling Centre', latitude: 20.80732181, longitude: 78.68236161 },
    { id: 373, name: 'Sri Vanchiamman Agencies Bharat Petrol Pump', latitude: 10.50582319, longitude: 77.74841247 },
    { id: 374, name: 'M/S. IOCL Pump', latitude: 17.56355821, longitude: 78.7094852 },
    { id: 375, name: 'Meenakshi Petroleum Product', latitude: 10.43850951, longitude: 78.78338844 },
    { id: 376, name: 'Amar fuels', latitude: 10.95374964, longitude: 78.29457606 },
    { id: 377, name: 'GMR Airport Filling Station', latitude: 17.244855, longitude: 78.458557 },
    { id: 378, name: 'Mahalakshmi Agency', latitude: 10.17509535, longitude: 78.98515677 },
    { id: 379, name: 'GKN Agency', latitude: 10.96204179, longitude: 79.38785338 },
    { id: 380, name: 'M/s. VBS Fuel Points', latitude: 17.38652094, longitude: 78.23498399 },
    { id: 381, name: 'UNI Traders', latitude: 16.08636172, longitude: 77.8980023 },
    { id: 382, name: 'M/s.Petroleum Agencies', latitude: 20.74873256, longitude: 78.60575709 },
    { id: 383, name: 'Manolaxmi petroleum', latitude: 19.95046901, longitude: 79.29787829 },
    { id: 384, name: 'Saritha Quality Fuels', latitude: 17.96289287, longitude: 79.63960284 },
    { id: 385, name: 'M/s. Hanu Viswas FS', latitude: 16.724185, longitude: 79.641615 },
    { id: 386, name: 'MUJAWAR ROADWAYS', latitude: 15.881205, longitude: 74.516858 },
    { id: 387, name: 'Heart King Agencies', latitude: 9.83095333, longitude: 78.63599002 },
    { id: 388, name: 'Purnima Filling Station', latitude: 16.76654912, longitude: 78.17083744 },
    { id: 389, name: 'Laxminarsimha Swamy Filling Station', latitude: 17.59840698, longitude: 79.63931106 },
    { id: 390, name: 'RK Service Station', latitude: 19.23904436, longitude: 83.823172 },
    { id: 391, name: 'M/S. GBR Filling Station', latitude: 16.86352174, longitude: 79.10645506 },
    { id: 392, name: 'Jadcherla filling station', latitude: 16.76526746, longitude: 78.12353413 },
    { id: 393, name: 'Sri Vinayaga Agencies Adhoc', latitude: 10.550774, longitude: 77.378045 },
    { id: 394, name: 'R.G.Sonnad Filling station', latitude: 16.65325363, longitude: 76.53122774 },
    { id: 395, name: 'Moogambigai Agency', latitude: 10.7189252, longitude: 78.94062175 },
    { id: 396, name: 'Sana Petroleum', latitude: 19.73641325, longitude: 79.18726525 },
    { id: 397, name: 'M/s. Kamala Sai FS', latitude: 17.162396, longitude: 79.436725 },
    { id: 398, name: 'KPN Agency', latitude: 10.58540736, longitude: 78.77587101 },
    { id: 399, name: 'Karur Lorry Association', latitude: 11.06388899, longitude: 78.01730882 },
    { id: 400, name: 'COCO Singampunari', latitude: 10.18812349, longitude: 78.40732331 },
    { id: 401, name: 'Sri sai filling station', latitude: 16.66522456, longitude: 78.5040053 },
    { id: 402, name: 'HEMALATA FILLING STATION', latitude: 19.2522824, longitude: 83.4592954 },
    { id: 403, name: 'M/S. Nalgonda Petroworld', latitude: 17.0240194, longitude: 79.33830264 },
    { id: 404, name: 'MAA GAYTRI FILLING STATION', latitude: 27.90187253, longitude: 78.8043192 },
    { id: 405, name: 'M/s. Lavanya Filling Station', latitude: 16.78660562, longitude: 79.33141508 },
    { id: 406, name: 'Sri Srinivasa Service', latitude: 10.77746283, longitude: 79.14189848 },
    { id: 407, name: 'M/s. Orugallu Filling Station', latitude: 17.98543706, longitude: 79.57395109 },
    { id: 408, name: 'M/s. Likhitha SS', latitude: 17.1870433, longitude: 78.47399773 },
    { id: 409, name: 'AR Bros', latitude: 9.68834632, longitude: 78.45002725 },
    { id: 410, name: 'Kadloor petroleums', latitude: 16.75547357, longitude: 77.12914028 },
    { id: 411, name: 'Jyothish Automobiles', latitude: 23.85586655, longitude: 78.70377223 },
    { id: 412, name: 'Seven hills Highway FS', latitude: 16.79315454, longitude: 78.14071889 },
    { id: 413, name: 'MKV Agencies', latitude: 10.9464216, longitude: 79.3373397 },
    { id: 414, name: 'M/S. Tej Filling Station', latitude: 17.22891728, longitude: 78.99562431 },
    { id: 415, name: 'M/s. Sri Manikanta Service Station', latitude: 17.13256234, longitude: 78.42737283 },
    { id: 416, name: 'Kailas Auto Supplies', latitude: 16.75334589, longitude: 78.02397051 },
    { id: 417, name: 'Sri Balaji Petrolium', latitude: 16.72089996, longitude: 78.0714203 },
    { id: 418, name: 'Aakarapu Balakrishnamma FS', latitude: 16.49592332, longitude: 78.29552877 },
    { id: 419, name: 'Sri Rakki Sakthi Enterprises', latitude: 10.73229234, longitude: 78.89797768 },
    { id: 420, name: 'M/s. S.P. Pandey & Sons', latitude: 21.16183835, longitude: 78.42900386 },
    { id: 421, name: 'Amrutha Agencies', latitude: 17.93765143, longitude: 80.81871907 },
];

// --- HELPER FUNCTIONS ---
function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}


// --- REACT COMPONENT ---
const App = () => {
    const mapRef = useRef<L.Map | null>(null);
    const routingControlRef = useRef<any>(null);

    const [search1, setSearch1] = useState('');
    const [search2, setSearch2] = useState('');
    const [selectedStation1Id, setSelectedStation1Id] = useState('');
    const [selectedStation2Id, setSelectedStation2Id] = useState('');
    const [distanceText, setDistanceText] = useState('Select two stations and click "Calculate" to see the distance.');

    // Initialize map
    useEffect(() => {
        if (!mapRef.current) {
            const map = L.map('map').setView([20.5937, 78.9629], 5);
            mapRef.current = map;

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            // Add all stations as markers
            stationData.forEach(station => {
                L.marker([station.latitude, station.longitude]).addTo(map)
                    .bindPopup(`<b>${station.name}</b>`);
            });
        }
    }, []);

    const handleCalculateDistance = () => {
        if (!mapRef.current || !selectedStation1Id || !selectedStation2Id) return;
    
        const map = mapRef.current;
        
        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
            routingControlRef.current = null;
        }
    
        const station1 = stationData.find(s => s.id === parseInt(selectedStation1Id, 10));
        const station2 = stationData.find(s => s.id === parseInt(selectedStation2Id, 10));
    
        if (!station1 || !station2) return;
    
        const latlng1 = L.latLng(station1.latitude, station1.longitude);
        const latlng2 = L.latLng(station2.latitude, station2.longitude);
        
        const control = L.Routing.control({
            waypoints: [latlng1, latlng2],
            routeWhileDragging: false,
            addWaypoints: false,
            createMarker: (i: number, waypoint: any, n: number) => {
                const station = i === 0 ? station1 : station2;
                return L.marker(waypoint.latLng)
                    .bindPopup(`<b>${station.name}</b>`)
                    .bindTooltip(station.name, {
                        permanent: true,
                        direction: 'top',
                        className: 'result-station-label'
                    }).openTooltip();
            },
            lineOptions: {
                styles: [{color: 'var(--primary-color)', opacity: 0.8, weight: 6}]
            },
        }).on('routesfound', (e: any) => {
            const route = e.routes[0];
            const distance = route.summary.totalDistance / 1000;
            const time = route.summary.totalTime;
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            setDistanceText(
                `Road Distance: <strong>${distance.toFixed(2)} km</strong>. Estimated travel time: <strong>${hours}h ${minutes}m</strong>.`
            );
            map.fitBounds(L.latLngBounds(latlng1, latlng2), {padding: [50, 50]});
        }).on('routingerror', () => {
            const distance = getHaversineDistance(station1.latitude, station1.longitude, station2.latitude, station2.longitude);
            setDistanceText(
                `Could not find a road route. Straight-line distance is <strong>${distance.toFixed(2)} km</strong>.`
            );
            const polyline = L.polyline([latlng1, latlng2], {color: 'red', dashArray: '5, 10'}).addTo(map);
            map.fitBounds(polyline.getBounds(), {padding: [50, 50]});
            routingControlRef.current = {
                _container: polyline, // Store polyline to be removed later
                remove: function() { map.removeLayer(this._container) }
             };
        }).addTo(map);
        
        routingControlRef.current = control;
    };

    const handleReset = () => {
        setSelectedStation1Id('');
        setSelectedStation2Id('');
        setSearch1('');
        setSearch2('');
        setDistanceText('Select two stations and click "Calculate" to see the distance.');

        if (mapRef.current && routingControlRef.current) {
            routingControlRef.current.remove();
            routingControlRef.current = null;
        }

        mapRef.current?.setView([20.5937, 78.9629], 5);
    };

    const filteredStations1 = stationData.filter(station =>
        station.name.toLowerCase().includes(search1.toLowerCase())
    );

    const filteredStations2 = stationData.filter(station =>
        station.name.toLowerCase().includes(search2.toLowerCase())
    );

    return (
        <div className="container">
            <header className="header">
                <h1>CNG Station Route Finder</h1>
            </header>
            <main className="main-content">
                <div className="controls">
                    <div className="control-group">
                        <label htmlFor="station1-search">Start Station</label>
                        <input
                            type="search"
                            id="station1-search"
                            value={search1}
                            onChange={(e) => setSearch1(e.target.value)}
                            placeholder="Search for station 1..."
                            aria-label="Search for starting station"
                        />
                        <select
                            id="station1"
                            value={selectedStation1Id}
                            onChange={(e) => setSelectedStation1Id(e.target.value)}
                            aria-label="Select starting station"
                        >
                            <option value="">-- Select Station 1 --</option>
                            {filteredStations1.map(station => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="control-group">
                        <label htmlFor="station2-search">End Station</label>
                        <input
                            type="search"
                            id="station2-search"
                            value={search2}
                            onChange={(e) => setSearch2(e.target.value)}
                            placeholder="Search for station 2..."
                            aria-label="Search for destination station"
                        />
                        <select
                            id="station2"
                            value={selectedStation2Id}
                            onChange={(e) => setSelectedStation2Id(e.target.value)}
                            aria-label="Select destination station"
                        >
                            <option value="">-- Select Station 2 --</option>
                            {filteredStations2.map(station => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-group">
                        <button
                            onClick={handleCalculateDistance}
                            disabled={!selectedStation1Id || !selectedStation2Id}
                            aria-label="Calculate distance between selected stations"
                        >
                            Calculate
                        </button>
                         <button onClick={handleReset} className="reset-button" aria-label="Reset selections and map">
                            Reset
                        </button>
                    </div>
                </div>
                <div className="result" dangerouslySetInnerHTML={{ __html: distanceText }}></div>
                <div id="map"></div>
            </main>
        </div>
    );
};

// --- RENDER APP ---
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}