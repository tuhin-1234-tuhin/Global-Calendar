document.addEventListener('DOMContentLoaded', () => {
    // --- STATE ---
    let currentYear = new Date().getFullYear();
    let currentLang = localStorage.getItem('globalCalendarLang') || 'en';
    let currentTheme = localStorage.getItem('globalCalendarTheme') || 'light';
    let selectedCountry = localStorage.getItem('globalCalendarCountry') || 'none';
    let events = JSON.parse(localStorage.getItem('globalCalendarEvents')) || [];

    // --- TRANSLATIONS ---
    const translations = {
        en: {
            appName: "Global Calendar",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            today: "Today",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            language: "Language",
            theme: "Theme",
            country: "Country",
            selectCountry: "Select Country",
            themeLight: "Light",
            themeDark: "Dark",
            themeGlass: "Glassmorphic",
            themeNeon: "Gradient Neon",
            addEditEvent: "Add/Edit Event",
            eventTitle: "Title:",
            eventDesc: "Description:",
            saveEvent: "Save Event",
            deleteEvent: "Delete Event",
            eventsOnDate: "Events on",
            noEvents: "No events on this date.",
            edit: "Edit",
            eidAlFitr: "Eid al-Fitr", eidAlAdha: "Eid al-Adha", ashura: "Ashura", newYear: "New Year's Day", independenceDay: "Independence Day", christmas: "Christmas Day", victoryDayBD: "Victory Day (BD)", languageDayBD: "Language Movement Day (BD)", republicDayIN: "Republic Day (IN)", diwaliIN: "Diwali (IN)", pakistanDayPK: "Pakistan Day (PK)", nationalDaySA: "National Day (SA)",
            countryNameBD: "Bangladesh", countryNameIN: "India", countryNamePK: "Pakistan", countryNameSA: "Saudi Arabia", countryNameUS: "USA",
            cannotBeEmpty: "cannot be empty.", areYouSure: "Are you sure?",
            goToDate: "Go", manualYear: "Year:", manualMonth: "Month:", manualDay: "Day:",
            invalidDateAlert: "Please enter a valid date.", invalidDayForMonthAlert: "Invalid day for selected month."
        },
        bn: {
            appName: "গ্লোবাল ক্যালেন্ডার",
            months: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
            daysShort: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"],
            today: "আজ",
            prevYear: "পূর্ববর্তী বছর", nextYear: "পরবর্তী বছর", language: "ভাষা", theme: "থিম", country: "দেশ", selectCountry: "দেশ নির্বাচন করুন",
            themeLight: "লাইট", themeDark: "ডার্ক", themeGlass: "গ্লাসমরফিক", themeNeon: "গ্রেডিয়েন্ট নিয়ন",
            addEditEvent: "ইভেন্ট যোগ/সম্পাদনা", eventTitle: "শিরোনাম:", eventDesc: "বিবরণ:", saveEvent: "সংরক্ষণ", deleteEvent: "মুছুন",
            eventsOnDate: "নির্দিষ্ট তারিখের ইভেন্ট", noEvents: "এই তারিখে কোন ইভেন্ট নেই।", edit: "সম্পাদনা",
            eidAlFitr: "ঈদুল ফিতর", eidAlAdha: "ঈদুল আযহা", ashura: "আশুরা", newYear: "নববর্ষ", independenceDay: "স্বাধীনতা দিবস", christmas: "বড়দিন", victoryDayBD: "বিজয় দিবস", languageDayBD: "ভাষা শহীদ দিবস", republicDayIN: "প্রজাতন্ত্র দিবস (ভারত)", diwaliIN: "দীপাবলি (ভারত)", pakistanDayPK: "পাকিস্তান দিবস", nationalDaySA: "জাতীয় দিবস (সৌদি)",
            countryNameBD: "বাংলাদেশ", countryNameIN: "ভারত", countryNamePK: "পাকিস্তান", countryNameSA: "সৌদি আরব", countryNameUS: "যুক্তরাষ্ট্র",
            cannotBeEmpty: "খালি রাখা যাবে না।", areYouSure: "আপনি কি নিশ্চিত?",
            goToDate: "যান", manualYear: "বছর:", manualMonth: "মাস:", manualDay: "দিন:",
            invalidDateAlert: "অনুগ্রহ করে একটি বৈধ তারিখ লিখুন।", invalidDayForMonthAlert: "নির্বাচিত মাসের জন্য দিনটি অবৈধ।"
        },
        // ... (অন্যান্য ভাষার অনুবাদ একইভাবে আপডেট করুন) ...
        ar: {
            appName: "التقويم العالمي",
            months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
            daysShort: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
            today: "اليوم", prevYear: "السنة السابقة", nextYear: "السنة التالية", language: "اللغة", theme: "المظهر", country: "البلد", selectCountry: "اختر دولة",
            themeLight: "فاتح", themeDark: "داكن", themeGlass: "زجاجي", themeNeon: "نيون متدرج",
            addEditEvent: "إضافة/تعديل حدث", eventTitle: "العنوان:", eventDesc: "الوصف:", saveEvent: "حفظ", deleteEvent: "حذف",
            eventsOnDate: "الأحداث في", noEvents: "لا توجد أحداث في هذا التاريخ.", edit: "تعديل",
            eidAlFitr: "عيد الفطر", eidAlAdha: "عيد الأضحى", ashura: "عاشوراء", newYear: "رأس السنة الميلادية", independenceDay: "يوم الاستقلال", christmas: "عيد الميلاد", nationalDaySA: "اليوم الوطني (السعودية)",
            countryNameBD: "بنغلاديش", countryNameIN: "الهند", countryNamePK: "باكستان", countryNameSA: "المملكة العربية السعودية", countryNameUS: "الولايات المتحدة الأمريكية",
            cannotBeEmpty: "لا يمكن أن يكون فارغا.", areYouSure: "هل أنت متأكد؟",
            goToDate: "اذهب", manualYear: "السنة:", manualMonth: "الشهر:", manualDay: "اليوم:",
            invalidDateAlert: "الرجاء إدخال تاريخ صحيح.", invalidDayForMonthAlert: "يوم غير صالح للشهر المحدد."
        },
        hi: {
            appName: " वैश्विक कैलेंडर",
            months: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
            daysShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
            today: "आज", prevYear: "पिछला वर्ष", nextYear: "अगला वर्ष", language: "भाषा", theme: "थीम", country: "देश", selectCountry: "देश चुनें",
            themeLight: "लाइट", themeDark: "डार्क", themeGlass: "ग्लासमॉर्फिक", themeNeon: "ग्रेडिएंट नियॉन",
            addEditEvent: "ईवेंट जोड़ें/संपादित करें", eventTitle: "शीर्षक:", eventDesc: "विवरण:", saveEvent: "सहेजें", deleteEvent: "हटाएं",
            eventsOnDate: "इस तिथि पर कार्यक्रम:", noEvents: "इस तिथि पर कोई कार्यक्रम नहीं।", edit: "संपादित करें",
            eidAlFitr: "ईद उल-फ़ित्र", eidAlAdha: "ईद उल-अज़हा", ashura: "आशूरा", newYear: "नव वर्ष दिवस", independenceDay: "स्वतंत्रता दिवस", christmas: "क्रिसमस दिवस", republicDayIN: "गणतंत्र दिवस (भारत)", diwaliIN: "दिवाली (भारत)",
            countryNameBD: "बांग्लादेश", countryNameIN: "भारत", countryNamePK: "पाकिस्तान", countryNameSA: "सऊदी अरब", countryNameUS: "संयुक्त राज्य अमेरिका",
            cannotBeEmpty: "खाली नहीं हो सकता।", areYouSure: "क्या आप निश्चित हैं?",
            goToDate: "जाएँ", manualYear: "वर्ष:", manualMonth: "महीना:", manualDay: "दिन:",
            invalidDateAlert: "कृपया एक वैध तिथि दर्ज करें।", invalidDayForMonthAlert: "चयनित महीने के लिए अमान्य दिन।"
        },
        ur: {
            appName: "عالمی کیلنڈر",
            months: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", " دسمبر"],
            daysShort: ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"],
            today: "آج", prevYear: "پچھلا سال", nextYear: "اگلا سال", language: "زبان", theme: "تھیم", country: "ملک", selectCountry: "ملک منتخب کریں",
            themeLight: "لائٹ", themeDark: "ڈارک", themeGlass: "گلاس مورفک", themeNeon: "گریڈینٹ نیون",
            addEditEvent: "ایونٹ شامل/ترمیم کریں", eventTitle: "عنوان:", eventDesc: "تفصیل:", saveEvent: "محفوظ کریں", deleteEvent: "حذف کریں",
            eventsOnDate: "اس تاریخ پر تقریبات:", noEvents: "اس تاریخ پر کوئی تقریب نہیں ہے۔", edit: "ترمیم",
            eidAlFitr: "عید الفطر", eidAlAdha: "عید الاضحی", ashura: "عاشورہ", newYear: "نئے سال کا دن", independenceDay: "یوم آزادی", christmas: "کرسمس کا دن", pakistanDayPK: "یوم پاکستان (پاکستان)",
            countryNameBD: "بنگلہ دیش", countryNameIN: "بھارت", countryNamePK: "پاکستان", countryNameSA: "سعودی عرب", countryNameUS: "ریاستہائے متحدہ امریکہ",
            cannotBeEmpty: "خالی نہیں ہو سکتا۔", areYouSure: "کیا آپ کو یقین ہے؟",
            goToDate: "جائیں", manualYear: "سال:", manualMonth: "مہینہ:", manualDay: "دن:",
            invalidDateAlert: "براہ کرم ایک درست تاریخ درج کریں۔", invalidDayForMonthAlert: "منتخب مہینے کے لیے غلط دن۔"
        },
         // Add translations for ta, ml, ja, ru, zh similarly
        ta: {
            appName: "உலக நாட்காட்டி",
            months: ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"],
            daysShort: ["ஞாயி", "திங்", "செவ்", "புத", "வியா", "வெள்", "சனி"],
            today: "இன்று", language: "மொழி", theme: "தீம்", country: "நாடு", selectCountry: "நாட்டைத் தேர்ந்தெடுக்கவும்",
            eidAlFitr: "ஈத் அல்-பித்ர்", eidAlAdha: "ஈத் அல்-আதா", newYear: "புத்தாண்டு நாள்", christmas: "கிறிஸ்துமஸ்", diwaliIN: "தீபாவளி (இந்தியா)", independenceDay: "சுதந்திர தினம்",
            countryNameBD: "பங்களாதேஷ்", countryNameIN: "இந்தியா", countryNamePK: "பாகிஸ்தான்", countryNameSA: "சவூதி அரேபியா", countryNameUS: "அமெரிக்கா",
            goToDate: "செல்", manualYear: "ஆண்டு:", manualMonth: "மாதம்:", manualDay: "நாள்:",
            invalidDateAlert: "சரியான தேதியை உள்ளிடவும்.", invalidDayForMonthAlert: "தேர்ந்தெடுக்கப்பட்ட மாதத்திற்கு தவறான நாள்."
        },
        ml: {
            appName: "ആഗോള കലണ്ടർ",
            months: ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ"],
            daysShort: ["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"],
            today: "ഇന്ന്", language: "ഭാഷ", theme: "തീം", country: "രാജ്യം", selectCountry: "രാജ്യം തിരഞ്ഞെടുക്കുക",
            eidAlFitr: "ഈദുൽ ഫിത്ർ", eidAlAdha: "ഈദുൽ അദ്ഹ", newYear: "പുതുവത്സര ദിനം", christmas: "ക്രിസ്മസ്", diwaliIN: "ദീപാവലി (ഇന്ത്യ)", independenceDay: "സ്വാതന്ത്ര്യദിനം",
            countryNameBD: "ബംഗ്ലാദേശ്", countryNameIN: "ഇന്ത്യ", countryNamePK: "പാകിസ്ഥാൻ", countryNameSA: "സൗദി അറേബ്യ", countryNameUS: "യുഎസ്എ",
            goToDate: "പോകുക", manualYear: "വർഷം:", manualMonth: "മാസം:", manualDay: "ദിവസം:",
            invalidDateAlert: "സാധുവായ ഒരു തീയതി നൽകുക.", invalidDayForMonthAlert: "തിരഞ്ഞെടുത്ത മാസത്തിലെ തെറ്റായ ദിവസം."
        },
        ja: {
            appName: "グローバルカレンダー",
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            daysShort: ["日", "月", "火", "水", "木", "金", "土"],
            today: "今日", language: "言語", theme: "テーマ", country: "国", selectCountry: "国を選択",
            newYear: "元日", christmas: "クリスマス",
            countryNameBD: "バングラデシュ", countryNameIN: "インド", countryNamePK: "パキスタン", countryNameSA: "サウジアラビア", countryNameUS: "アメリカ合衆国",
            goToDate: "移動", manualYear: "年:", manualMonth: "月:", manualDay: "日:",
            invalidDateAlert: "有効な日付を入力してください。", invalidDayForMonthAlert: "選択した月に対して無効な日です。"
        },
        ru: {
            appName: "Глобальный календарь",
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            today: "Сегодня", language: "Язык", theme: "Тема", country: "Страна", selectCountry: "Выберите страну",
            eidAlFitr: "Ураза-байрам", eidAlAdha: "Курбан-байрам", newYear: "Новый год", christmas: "Рождество",
            countryNameBD: "Бангладеш", countryNameIN: "Индия", countryNamePK: "Пакистан", countryNameSA: "Саудовская Аравия", countryNameUS: "США",
            goToDate: "Перейти", manualYear: "Год:", manualMonth: "Месяц:", manualDay: "День:",
            invalidDateAlert: "Пожалуйста, введите действительную дату.", invalidDayForMonthAlert: "Неверный день для выбранного месяца."
        },
        zh: {
            appName: "全球日历",
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            daysShort: ["日", "一", "二", "三", "四", "五", "六"],
            today: "今天", language: "语言", theme: "主题", country: "国家", selectCountry: "选择国家",
            newYear: "元旦", christmas: "圣诞节", eidAlFitr: "开斋节", eidAlAdha: "宰牲节",
            countryNameBD: "孟加拉国", countryNameIN: "印度", countryNamePK: "巴基斯坦", countryNameSA: "沙特阿拉伯", countryNameUS: "美国",
            goToDate: "转到", manualYear: "年份:", manualMonth: "月份:", manualDay: "日期:",
            invalidDateAlert: "请输入有效日期。", invalidDayForMonthAlert: "所选月份的日期无效。"
        },
    };
    let activeHolidays = {};

    const nationalHolidaysData = {
        common: { '01-01': { nameKey: 'newYear', type: 'national' }, '12-25': { nameKey: 'christmas', type: 'national' }, },
        BD: { '02-21': { nameKey: 'languageDayBD', type: 'national' }, '03-26': { nameKey: 'independenceDay', type: 'national' }, '12-16': { nameKey: 'victoryDayBD', type: 'national' }, },
        IN: { '01-26': { nameKey: 'republicDayIN', type: 'national' }, '08-15': { nameKey: 'independenceDay', type: 'national' }, '11-01': { nameKey: 'diwaliIN', type: 'national' },}, // Diwali 2024 example
        PK: { '03-23': { nameKey: 'pakistanDayPK', type: 'national' }, '08-14': { nameKey: 'independenceDay', type: 'national' }, },
        SA: { '09-23': { nameKey: 'nationalDaySA', type: 'national' }, },
        US: { '07-04': { nameKey: 'independenceDay', type: 'national' }, }
    };

    // --- DOM ELEMENTS ---
    const calendarContainer = document.getElementById('calendar-container');
    const currentYearDisplay = document.getElementById('current-year-display');
    const prevYearBtn = document.getElementById('prev-year');
    const nextYearBtn = document.getElementById('next-year');
    const languageSelector = document.getElementById('language-selector');
    const themeSelector = document.getElementById('theme-selector');
    const countrySelector = document.getElementById('country-selector');
    const currentDateDisplayElem = document.getElementById('current-date-display');

    // Manual Date Input Elements
    const manualYearInput = document.getElementById('manual-year-input');
    const manualMonthSelect = document.getElementById('manual-month-select');
    const manualDaySelect = document.getElementById('manual-day-select');
    const goToDateBtn = document.getElementById('go-to-date-btn');
    const manualYearLabel = document.getElementById('manual-year-label');
    const manualMonthLabel = document.getElementById('manual-month-label');
    const manualDayLabel = document.getElementById('manual-day-label');

    // Modal elements (অপরিবর্তিত)
    const eventModal = document.getElementById('event-modal');
    const modalCloseBtn = eventModal.querySelector('.modal-close-btn');
    const modalTitleElem = document.getElementById('modal-title-elem');
    const eventIdInput = document.getElementById('event-id');
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventDescriptionInput = document.getElementById('event-description');
    const saveEventBtn = document.getElementById('save-event-btn');
    const deleteEventBtn = document.getElementById('delete-event-btn');
    const eventsListContainer = document.getElementById('events-list-container');
    const eventsListUl = document.getElementById('events-list');


    // --- HELPER FUNCTIONS ---
    function getTranslation(key, lang = currentLang) {
        return translations[lang]?.[key] || translations.en[key] || key;
    }

    function getMonthName(monthIndex, lang = currentLang) {
        return getTranslation('months', lang)[monthIndex];
    }

    function getDayShortName(dayIndex, lang = currentLang) {
        return getTranslation('daysShort', lang)[dayIndex];
    }
    
    function getIslamicHolidays(year) {
        const hijriHolidays = {};
        if (typeof moment !== 'undefined' && moment.fn.hijri) {
            let estimatedHijriYear = Math.floor((year - 622) * 1.0307);
            for (let hYearOffset = -2; hYearOffset <= 2; hYearOffset++) {
                const currentHijriYear = estimatedHijriYear + hYearOffset;
                const eidFitr = moment(currentHijriYear + '/10/01', 'iYYYY/iM/iD');
                if (eidFitr.year() === year) hijriHolidays[eidFitr.format('YYYY-MM-DD')] = { nameKey: 'eidAlFitr', type: 'islamic' };
                const eidAdha = moment(currentHijriYear + '/12/10', 'iYYYY/iM/iD');
                if (eidAdha.year() === year) hijriHolidays[eidAdha.format('YYYY-MM-DD')] = { nameKey: 'eidAlAdha', type: 'islamic' };
                const ashura = moment(currentHijriYear + '/01/10', 'iYYYY/iM/iD');
                if (ashura.year() === year) hijriHolidays[ashura.format('YYYY-MM-DD')] = { nameKey: 'ashura', type: 'islamic' };
            }
        } else { console.warn("Moment.js or Moment-Hijri not loaded."); }
        return hijriHolidays;
    }

    function populateActiveHolidays(year, countryCode) {
        activeHolidays = {};
        Object.keys(nationalHolidaysData.common).forEach(dateSuffix => {
            activeHolidays[`${year}-${dateSuffix}`] = nationalHolidaysData.common[dateSuffix];
        });
        if (nationalHolidaysData[countryCode]) {
            Object.keys(nationalHolidaysData[countryCode]).forEach(dateSuffix => {
                activeHolidays[`${year}-${dateSuffix}`] = nationalHolidaysData[countryCode][dateSuffix];
            });
        }
        const islamicHolidaysForYear = getIslamicHolidays(year);
        Object.keys(islamicHolidaysForYear).forEach(date => {
            activeHolidays[date] = islamicHolidaysForYear[date];
        });
    }

    // --- CALENDAR RENDERING ---
    function renderFullYear(year) {
        calendarContainer.innerHTML = '';
        currentYearDisplay.textContent = year;
        populateActiveHolidays(year, selectedCountry);

        for (let month = 0; month < 12; month++) {
            const monthContainer = document.createElement('div');
            monthContainer.className = 'month-container';
            monthContainer.setAttribute('role', 'grid');
            monthContainer.setAttribute('aria-labelledby', `month-header-${year}-${month}`);

            const monthHeader = document.createElement('div');
            monthHeader.className = 'month-header';
            monthHeader.id = `month-header-${year}-${month}`;
            monthHeader.textContent = `${getMonthName(month, currentLang)} ${year}`;
            monthContainer.appendChild(monthHeader);

            const daysGrid = document.createElement('div');
            daysGrid.className = 'days-grid';
            
            for (let i = 0; i < 7; i++) {
                const dayNameCell = document.createElement('div');
                dayNameCell.className = 'day-name';
                dayNameCell.textContent = getDayShortName(i, currentLang);
                daysGrid.appendChild(dayNameCell);
            }

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();

            for (let i = 0; i < firstDayOfMonth; i++) {
                daysGrid.appendChild(document.createElement('div')).className = 'day-cell empty';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'day-cell';
                dayCell.setAttribute('tabindex', '0');
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                dayCell.dataset.date = dateStr;

                const dayNumberSpan = document.createElement('span');
                dayNumberSpan.className = 'day-number';
                dayNumberSpan.textContent = day;
                dayCell.appendChild(dayNumberSpan);

                if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                    dayCell.classList.add('today');
                    dayCell.setAttribute('aria-current', 'date');
                }

                if (activeHolidays[dateStr]) {
                    const holidayInfo = activeHolidays[dateStr];
                    dayCell.classList.add(holidayInfo.type === 'islamic' ? 'islamic-holiday' : 'holiday');
                    const holidayNameSpan = document.createElement('span');
                    holidayNameSpan.className = 'holiday-name';
                    holidayNameSpan.textContent = getTranslation(holidayInfo.nameKey);
                    dayCell.appendChild(holidayNameSpan);
                    dayCell.setAttribute('aria-label', `${day}, ${getMonthName(month)}, ${getTranslation(holidayInfo.nameKey)}`);
                } else {
                     dayCell.setAttribute('aria-label', `${day}, ${getMonthName(month)}`);
                }
                
                if (events.some(event => event.date === dateStr)) {
                    dayCell.appendChild(document.createElement('div')).className = 'event-badge';
                }

                dayCell.addEventListener('click', () => openEventModal(dateStr));
                dayCell.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openEventModal(dateStr); });
                daysGrid.appendChild(dayCell);
            }
            monthContainer.appendChild(daysGrid);
            calendarContainer.appendChild(monthContainer);
        }
        updateCurrentDateDisplay();
    }

    // --- MANUAL DATE INPUT HELPERS ---
    function populateManualMonthSelector(lang = currentLang) {
        manualMonthSelect.innerHTML = '';
        const months = getTranslation('months', lang);
        months.forEach((monthName, index) => {
            const option = document.createElement('option');
            option.value = index; // 0 for January
            option.textContent = monthName;
            manualMonthSelect.appendChild(option);
        });
    }

    function populateManualDaySelector(year, monthIndex) {
        manualDaySelect.innerHTML = '';
        if (year === null || monthIndex === null || isNaN(year) || isNaN(monthIndex) || year < 1900 || year > 2100) {
            const defaultOption = document.createElement('option');
            defaultOption.textContent = '--'; defaultOption.value = '';
            manualDaySelect.appendChild(defaultOption); return;
        }
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i; option.textContent = i;
            manualDaySelect.appendChild(option);
        }
    }

    // --- NAVIGATION & CONTROL EVENT LISTENERS ---
    prevYearBtn.addEventListener('click', () => { currentYear--; renderFullYear(currentYear); scrollToCurrentMonthOnLoad(); });
    nextYearBtn.addEventListener('click', () => { currentYear++; renderFullYear(currentYear); scrollToCurrentMonthOnLoad(); });

    languageSelector.addEventListener('change', (e) => applyLanguage(e.target.value));
    themeSelector.addEventListener('change', (e) => applyTheme(e.target.value));
    countrySelector.addEventListener('change', (e) => {
        selectedCountry = e.target.value;
        localStorage.setItem('globalCalendarCountry', selectedCountry);
        renderFullYear(currentYear);
    });

    // Manual Date Input Listeners
    manualYearInput.addEventListener('change', () => { // Also on input for immediate feedback if year is complete
        const year = parseInt(manualYearInput.value);
        const monthIndex = parseInt(manualMonthSelect.value);
        if (manualYearInput.value.length === 4 && year >=1900 && year <=2100) {
             populateManualDaySelector(year, monthIndex);
        } else {
             populateManualDaySelector(null, null); // Clear days if year is incomplete/invalid
        }
    });
     manualYearInput.addEventListener('input', () => { // For UX
        const year = parseInt(manualYearInput.value);
        const monthIndex = parseInt(manualMonthSelect.value);
        if (manualYearInput.value.length === 4 && year >=1900 && year <=2100) {
             populateManualDaySelector(year, monthIndex);
        } else {
             populateManualDaySelector(null, null);
        }
    });


    manualMonthSelect.addEventListener('change', () => {
        const year = parseInt(manualYearInput.value);
        const monthIndex = parseInt(manualMonthSelect.value);
        populateManualDaySelector(year, monthIndex);
    });

    goToDateBtn.addEventListener('click', () => {
        const year = parseInt(manualYearInput.value);
        const monthIndex = parseInt(manualMonthSelect.value);
        const day = parseInt(manualDaySelect.value);

        if (isNaN(year) || isNaN(monthIndex) || isNaN(day) ||
            year < 1900 || year > 2100 || monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
            alert(getTranslation('invalidDateAlert')); return;
        }
        const daysInSelectedMonth = new Date(year, monthIndex + 1, 0).getDate();
        if (day > daysInSelectedMonth) {
            alert(`${getTranslation('invalidDayForMonthAlert')} ${getMonthName(monthIndex)} ${year} ${getTranslation('hasDaysText') || 'has'} ${daysInSelectedMonth} ${getTranslation('daysSuffixText') || 'days'}.`);
            // Add 'hasDaysText' and 'daysSuffixText' to translations for full localization.
            return;
        }
        currentYear = year;
        renderFullYear(year);
        scrollToSelectedDate(year, monthIndex, day);
    });

    // --- APPLY SETTINGS FUNCTIONS ---
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('globalCalendarLang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';

        // Update static text
        document.getElementById('app-title').textContent = getTranslation('appName');
        prevYearBtn.setAttribute('aria-label', getTranslation('prevYear'));
        nextYearBtn.setAttribute('aria-label', getTranslation('nextYear'));
        document.getElementById('lang-selector-label').textContent = getTranslation('language');
        document.getElementById('theme-selector-label').textContent = getTranslation('theme');
        document.getElementById('country-selector-label').textContent = getTranslation('country');
        
        document.getElementById('theme-light-option').textContent = getTranslation('themeLight');
        document.getElementById('theme-dark-option').textContent = getTranslation('themeDark');
        document.getElementById('theme-glass-option').textContent = getTranslation('themeGlass');
        document.getElementById('theme-neon-option').textContent = getTranslation('themeNeon');
        
        document.getElementById('country-none-option').textContent = getTranslation('selectCountry');
        ['bd', 'in', 'pk', 'sa', 'us'].forEach(code => {
            const option = document.getElementById(`country-${code}-option`);
            if(option) option.textContent = getTranslation(`countryName${code.toUpperCase()}`);
        });

        // Modal text
        modalTitleElem.textContent = getTranslation('addEditEvent');
        document.getElementById('event-title-label').textContent = getTranslation('eventTitle');
        document.getElementById('event-desc-label').textContent = getTranslation('eventDesc');
        saveEventBtn.textContent = getTranslation('saveEvent');
        deleteEventBtn.textContent = getTranslation('deleteEvent');
        document.getElementById('events-on-date-label').textContent = getTranslation('eventsOnDate');

        // Manual date input labels
        manualYearLabel.textContent = getTranslation('manualYear');
        manualMonthLabel.textContent = getTranslation('manualMonth');
        manualDayLabel.textContent = getTranslation('manualDay');
        goToDateBtn.textContent = getTranslation('goToDate');
        goToDateBtn.setAttribute('aria-label', getTranslation('goToDate'));

        populateManualMonthSelector(lang);
        const selYear = parseInt(manualYearInput.value) || new Date().getFullYear();
        const selMonth = parseInt(manualMonthSelect.value); // Might be NaN if not yet set
        populateManualDaySelector(selYear, isNaN(selMonth) ? new Date().getMonth() : selMonth);
        
        renderFullYear(currentYear);
    }

    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('globalCalendarTheme', theme);
        document.body.className = `theme-${theme}`;
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            let color = '#007bff';
            if (theme === 'dark') color = '#1e1e1e';
            if (theme === 'glassmorphic') color = 'rgba(255, 255, 255, 0.3)';
            if (theme === 'neon') color = '#0f0c29';
            themeColorMeta.setAttribute('content', color);
        }
    }

    // --- CURRENT DATE DISPLAY ---
    function updateCurrentDateDisplay() {
        const today = new Date();
        currentDateDisplayElem.textContent = `${getTranslation('today')}: ${today.getDate()} ${getMonthName(today.getMonth(), currentLang)} ${today.getFullYear()}`;
    }

    // --- EVENT MANAGEMENT (অপরিবর্তিত, শুধু loadEventsForDate এ date parsing উন্নত করা হয়েছে) ---
    function openEventModal(dateStr, eventToEdit = null) {
        eventModal.classList.add('show');
        eventDateInput.value = dateStr;
        eventIdInput.value = eventToEdit ? eventToEdit.id : '';
        eventTitleInput.value = eventToEdit ? eventToEdit.title : '';
        eventDescriptionInput.value = eventToEdit ? eventToEdit.description : '';
        modalTitleElem.textContent = getTranslation(eventToEdit ? 'addEditEvent' : 'addEditEvent');
        deleteEventBtn.style.display = eventToEdit ? 'inline-block' : 'none';
        loadEventsForDate(dateStr);
        eventTitleInput.focus();
    }
    function closeEventModal() { eventModal.classList.remove('show'); }

    function loadEventsForDate(dateStr) {
        eventsListUl.innerHTML = '';
        const eventsOnDate = events.filter(event => event.date === dateStr);
        const [year, month, day] = dateStr.split('-').map(Number);
        const modalDate = new Date(year, month - 1, day);
        const formattedDate = `${getMonthName(modalDate.getMonth(), currentLang)} ${modalDate.getDate()}`;
        document.getElementById('events-on-date-label').textContent = `${getTranslation('eventsOnDate')} ${formattedDate}:`;

        if (eventsOnDate.length === 0) {
            eventsListUl.appendChild(document.createElement('li')).textContent = getTranslation('noEvents'); return;
        }
        eventsOnDate.forEach(event => {
            const li = document.createElement('li'); li.className = 'event-item';
            const titleSpan = document.createElement('span'); titleSpan.className = 'event-item-title'; titleSpan.textContent = event.title;
            li.appendChild(titleSpan);
            if (event.description) {
                const descSpan = document.createElement('span'); descSpan.className = 'event-item-description';
                descSpan.textContent = ` - ${event.description.substring(0,30)}${event.description.length > 30 ? '...' : ''}`;
                li.appendChild(descSpan);
            }
            const editButton = document.createElement('button'); editButton.textContent = getTranslation('edit');
            editButton.className = 'edit-event-item-btn';
            editButton.setAttribute('aria-label', `${getTranslation('edit')} ${event.title}`);
            editButton.onclick = () => openEventModal(dateStr, event);
            const actionsDiv = document.createElement('div'); actionsDiv.className = 'event-item-actions'; actionsDiv.appendChild(editButton);
            li.appendChild(actionsDiv);
            eventsListUl.appendChild(li);
        });
    }
    modalCloseBtn.addEventListener('click', closeEventModal);
    eventModal.addEventListener('click', (e) => { if (e.target === eventModal) closeEventModal(); });

    saveEventBtn.addEventListener('click', () => {
        const id = eventIdInput.value;
        const date = eventDateInput.value;
        const title = eventTitleInput.value.trim();
        const description = eventDescriptionInput.value.trim();
        if (!title) { alert(getTranslation('eventTitle').replace(':', '') + " " + getTranslation('cannotBeEmpty')); return; }
        if (id) {
            const eventIndex = events.findIndex(event => event.id == id);
            if (eventIndex > -1) events[eventIndex] = { ...events[eventIndex], title, description };
        } else {
            events.push({ id: Date.now().toString(), date, title, description });
        }
        localStorage.setItem('globalCalendarEvents', JSON.stringify(events));
        renderFullYear(currentYear); closeEventModal();
    });
    deleteEventBtn.addEventListener('click', () => {
        const id = eventIdInput.value;
        if (id && confirm(getTranslation('deleteEvent') + "? " + getTranslation('areYouSure'))) {
            events = events.filter(event => event.id != id);
            localStorage.setItem('globalCalendarEvents', JSON.stringify(events));
            renderFullYear(currentYear); closeEventModal();
        }
    });

    // --- SCROLL FUNCTIONS ---
    function scrollToSelectedDate(year, monthIndex, day) {
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const targetCell = calendarContainer.querySelector(`.day-cell[data-date="${dateStr}"]`);
        if (targetCell) {
            setTimeout(() => {
                targetCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetCell.focus();
                targetCell.classList.add('date-focused');
                setTimeout(() => targetCell.classList.remove('date-focused'), 2000);
            }, 100);
        } else {
            const targetMonthId = `month-header-${year}-${monthIndex}`;
            const targetMonthElement = document.getElementById(targetMonthId);
            if (targetMonthElement) {
                setTimeout(() => targetMonthElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
        }
    }
    function scrollToCurrentMonthOnLoad() {
        const today = new Date();
        if (currentYear === today.getFullYear()) { // Only scroll if viewing the current actual year
            scrollToSelectedDate(today.getFullYear(), today.getMonth(), today.getDate());
        }
    }

    // --- INITIALIZATION ---
    function init() {
        languageSelector.value = currentLang;
        themeSelector.value = currentTheme;
        countrySelector.value = selectedCountry;

        const todayForManualInput = new Date();
        manualYearInput.value = currentYear; // Initialize with currentYear (from storage or today's year)
        populateManualMonthSelector(currentLang); // Populate months before setting value
        manualMonthSelect.value = todayForManualInput.getMonth(); // Default to current actual month
        populateManualDaySelector(currentYear, todayForManualInput.getMonth());
        manualDaySelect.value = todayForManualInput.getDate(); // Default to current actual day

        applyTheme(currentTheme);
        applyLanguage(currentLang); // This calls renderFullYear which uses currentYear

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('SW registered.', reg))
                .catch(err => console.error('SW registration failed:', err));
        }
        scrollToCurrentMonthOnLoad();
    }
    init();
});