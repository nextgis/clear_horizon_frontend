/*! For license information please see 8906c97bab.js.LICENSE.txt */
(self.webpackChunkclear_horizon=self.webpackChunkclear_horizon||[]).push([[890],{27884:function(a,e,_){!function(a){"use strict";function e(a,e,_,r){var n={s:["थोडया सॅकंडांनी","थोडे सॅकंड"],ss:[a+" सॅकंडांनी",a+" सॅकंड"],m:["एका मिणटान","एक मिनूट"],mm:[a+" मिणटांनी",a+" मिणटां"],h:["एका वरान","एक वर"],hh:[a+" वरांनी",a+" वरां"],d:["एका दिसान","एक दीस"],dd:[a+" दिसांनी",a+" दीस"],M:["एका म्हयन्यान","एक म्हयनो"],MM:[a+" म्हयन्यानी",a+" म्हयने"],y:["एका वर्सान","एक वर्स"],yy:[a+" वर्सांनी",a+" वर्सां"]};return r?n[_][0]:n[_][1]}a.defineLocale("gom-deva",{months:{standalone:"जानेवारी_फेब्रुवारी_मार्च_एप्रील_मे_जून_जुलय_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),format:"जानेवारीच्या_फेब्रुवारीच्या_मार्चाच्या_एप्रीलाच्या_मेयाच्या_जूनाच्या_जुलयाच्या_ऑगस्टाच्या_सप्टेंबराच्या_ऑक्टोबराच्या_नोव्हेंबराच्या_डिसेंबराच्या".split("_"),isFormat:/MMMM(\s)+D[oD]?/},monthsShort:"जाने._फेब्रु._मार्च_एप्री._मे_जून_जुल._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),monthsParseExact:!0,weekdays:"आयतार_सोमार_मंगळार_बुधवार_बिरेस्तार_सुक्रार_शेनवार".split("_"),weekdaysShort:"आयत._सोम._मंगळ._बुध._ब्रेस्त._सुक्र._शेन.".split("_"),weekdaysMin:"आ_सो_मं_बु_ब्रे_सु_शे".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A h:mm [वाजतां]",LTS:"A h:mm:ss [वाजतां]",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY A h:mm [वाजतां]",LLLL:"dddd, MMMM Do, YYYY, A h:mm [वाजतां]",llll:"ddd, D MMM YYYY, A h:mm [वाजतां]"},calendar:{sameDay:"[आयज] LT",nextDay:"[फाल्यां] LT",nextWeek:"[फुडलो] dddd[,] LT",lastDay:"[काल] LT",lastWeek:"[फाटलो] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s",past:"%s आदीं",s:e,ss:e,m:e,mm:e,h:e,hh:e,d:e,dd:e,M:e,MM:e,y:e,yy:e},dayOfMonthOrdinalParse:/\d{1,2}(वेर)/,ordinal:function(a,e){return"D"===e?a+"वेर":a},week:{dow:0,doy:3},meridiemParse:/राती|सकाळीं|दनपारां|सांजे/,meridiemHour:function(a,e){return 12===a&&(a=0),"राती"===e?a<4?a:a+12:"सकाळीं"===e?a:"दनपारां"===e?a>12?a:a+12:"सांजे"===e?a+12:void 0},meridiem:function(a,e,_){return a<4?"राती":a<12?"सकाळीं":a<16?"दनपारां":a<20?"सांजे":"राती"}})}(_(30381))},23168:function(a,e,_){!function(a){"use strict";function e(a,e,_,r){var n={s:["thoddea sekondamni","thodde sekond"],ss:[a+" sekondamni",a+" sekond"],m:["eka mintan","ek minut"],mm:[a+" mintamni",a+" mintam"],h:["eka voran","ek vor"],hh:[a+" voramni",a+" voram"],d:["eka disan","ek dis"],dd:[a+" disamni",a+" dis"],M:["eka mhoinean","ek mhoino"],MM:[a+" mhoineamni",a+" mhoine"],y:["eka vorsan","ek voros"],yy:[a+" vorsamni",a+" vorsam"]};return r?n[_][0]:n[_][1]}a.defineLocale("gom-latn",{months:{standalone:"Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),format:"Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea".split("_"),isFormat:/MMMM(\s)+D[oD]?/},monthsShort:"Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split("_"),weekdaysShort:"Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),weekdaysMin:"Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A h:mm [vazta]",LTS:"A h:mm:ss [vazta]",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY A h:mm [vazta]",LLLL:"dddd, MMMM Do, YYYY, A h:mm [vazta]",llll:"ddd, D MMM YYYY, A h:mm [vazta]"},calendar:{sameDay:"[Aiz] LT",nextDay:"[Faleam] LT",nextWeek:"[Fuddlo] dddd[,] LT",lastDay:"[Kal] LT",lastWeek:"[Fattlo] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s",past:"%s adim",s:e,ss:e,m:e,mm:e,h:e,hh:e,d:e,dd:e,M:e,MM:e,y:e,yy:e},dayOfMonthOrdinalParse:/\d{1,2}(er)/,ordinal:function(a,e){return"D"===e?a+"er":a},week:{dow:0,doy:3},meridiemParse:/rati|sokallim|donparam|sanje/,meridiemHour:function(a,e){return 12===a&&(a=0),"rati"===e?a<4?a:a+12:"sokallim"===e?a:"donparam"===e?a>12?a:a+12:"sanje"===e?a+12:void 0},meridiem:function(a,e,_){return a<4?"rati":a<12?"sokallim":a<16?"donparam":a<20?"sanje":"rati"}})}(_(30381))}}]);
//# sourceMappingURL=8906c97bab.js.map