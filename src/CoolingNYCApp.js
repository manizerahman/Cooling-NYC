// Cooling NYC Full App Preview
import React, { useState, useEffect } from "react";
// Import SVGs as URL strings

// Translations for all the text in the application
const translations = {
  English: {
    languageTitle: "🌐 Preferred Language?",
    nameTitle: "What's your name?",
    namePlaceholder: "Type your name here...",
    ageTitle: "Your age?",
    agePlaceholder: "Enter your age...",
    temperatureTitle: "Indoor temperature?",
    temperaturePlaceholder: "Enter temperature...",
    temperatureUnitTitle: "Temperature unit",
    fahrenheit: "Fahrenheit",
    celsius: "Celsius",
    locationTitle: "Where are you located?",
    zipPlaceholder: "ZIP Code (e.g. 10025, 11201, or 11432)",
    addressPlaceholder: "Full Address (Optional)",
    zipWarning: "Please enter a valid 5-digit ZIP code",
    incomeTitle: "Income Level?",
    lessThan20k: "Less than $20,000",
    between20kAnd40k: "$20,000 – $40,000",
    between40kAnd60k: "$40,000 – $60,000",
    moreThan60k: "More than $60,000",
    advocacyTitle: "Advocacy Level?",
    unitOrBuilding: "Unit or Building",
    streetOrNeighborhood: "Street or Neighborhood",
    boroughOrCity: "Borough or City",
    landlordTitle: "Landlord Mediation Help?",
    yesNeedLetter: "Yes, I need a letter",
    noThanks: "No, thank you",
    legalHelpTitle: "Legal Help?",
    proBono: "Pro bono",
    between100And300: "$100 – $300",
    between300And500: "$300 – $500",
    moreThan500: "$500+",
    noLegalHelp: "No legal help needed",
    back: "← Back",
    next: "Next →",
    coolingNYCTitle: "CoolNYC",
    finalPlanTitle: "✅ Final Cooling Plan for",
    temperatureSection: "🌡️ Temperature",
    indoor: "Indoor temperature:",
    noTempProvided: "No temperature information provided",
    subsidySection: "💸 HEAP Subsidy Eligibility",
    qualifyHeap: "You may qualify for the NYC HEAP subsidy.",
    notQualifyHeap: "You may not qualify for HEAP, but can call 311 for assistance.",
    noIncomeProvided: "Please provide income information to check eligibility",
    coolingCentersTitle: "🏬 Cooling Centers for ZIP",
    noCoolingCenters: "No cooling centers found for your ZIP code",
    legalAidTitle: "⚖️ Legal Aid Clinics for ZIP",
    noLegalAid: "No legal aid clinics found for your ZIP code",
    advocacyOrgsTitle: "📣 Advocacy Organizations in",
    noAdvocacyOrgs: "No advocacy organizations found for",
    retailersTitle: "🛒 Cooling Equipment Retailers in ZIP",
    noRetailers: "No retailers found for your ZIP code",
    legalSupportTitle: "⚖️ Legal Assistance Request Letter",
    landlordLetterTitle: "🏢 Property Owner Compliance Notice",
    startOver: "Start Over",
    validationLanguage: "Please select a language",
    validationName: "Please enter your name",
    validationAge: "Please enter your age",
    validationTemperature: "Please enter the temperature",
    validationTemperatureUnit: "Please select a temperature unit",
    validationZip: "Please enter a valid 5-digit ZIP code",
    validationIncome: "Please select an income level",
    validationAdvocacy: "Please select an advocacy level",
    validationLandlord: "Please select an option",
    validationLegal: "Please select an option",
    loading: "Loading your cooling plan...",
    loadingDesc: "Please wait while we prepare your personalized recommendations.",
    errorTitle: "Error Loading Data",
    errorRefresh: "Please try refreshing the page or contact support.",
    zipRequired: "Please Enter Your ZIP Code",
    zipRequiredDesc: "We need your ZIP code to provide relevant cooling information.",
    tryZipCodes: "Try one of these ZIP codes for demonstration:",
    goBack: "Go Back",
    noResourcesFound: "No Resources Found",
    noResourcesFoundDesc: "We couldn't find any community resources for ZIP code",
    restart: "Restart Quiz",
    unitOption: "Unit",
    buildingOption: "Building",
    neighborhoodOrBoroughOption: "Neighborhood/Borough",
    cityOption: "City"
  },
  Español: {
    languageTitle: "🌐 ¿Idioma preferido?",
    nameTitle: "¿Cómo te llamas?",
    namePlaceholder: "Escribe tu nombre aquí...",
    ageTitle: "¿Tu edad?",
    agePlaceholder: "Ingresa tu edad...",
    temperatureTitle: "¿Temperatura interior?",
    temperaturePlaceholder: "Ingresa la temperatura...",
    temperatureUnitTitle: "Unidad de temperatura",
    fahrenheit: "Fahrenheit",
    celsius: "Celsius",
    locationTitle: "¿Dónde estás ubicado?",
    zipPlaceholder: "Código postal (ej. 10025, 11201, o 11432)",
    addressPlaceholder: "Dirección completa (Opcional)",
    zipWarning: "Por favor, ingresa un código postal válido de 5 dígitos",
    incomeTitle: "¿Nivel de ingresos?",
    lessThan20k: "Menos de $20,000",
    between20kAnd40k: "$20,000 – $40,000",
    between40kAnd60k: "$40,000 – $60,000",
    moreThan60k: "Más de $60,000",
    advocacyTitle: "¿Nivel de defensa?",
    unitOrBuilding: "Unidad o Edificio",
    streetOrNeighborhood: "Calle o Vecindario",
    boroughOrCity: "Distrito o Ciudad",
    landlordTitle: "¿Ayuda con mediación con el propietario?",
    yesNeedLetter: "Sí, necesito una carta",
    noThanks: "No, gracias",
    legalHelpTitle: "¿Ayuda legal?",
    proBono: "Pro bono",
    between100And300: "$100 – $300",
    between300And500: "$300 – $500",
    moreThan500: "$500+",
    noLegalHelp: "No necesito ayuda legal",
    back: "← Atrás",
    next: "Siguiente →",
    coolingNYCTitle: "CoolNYC",
    finalPlanTitle: "✅ Plan Final de Enfriamiento para",
    temperatureSection: "🌡️ Temperatura",
    indoor: "Temperatura interior:",
    noTempProvided: "No se proporcionó información de temperatura",
    subsidySection: "💸 Elegibilidad para Subsidio HEAP",
    qualifyHeap: "Puede calificar para el subsidio HEAP de NYC.",
    notQualifyHeap: "Es posible que no califique para HEAP, pero puede llamar al 311 para obtener asistencia.",
    noIncomeProvided: "Proporcione información de ingresos para verificar la elegibilidad",
    coolingCentersTitle: "🏬 Centros de Enfriamiento para código postal",
    noCoolingCenters: "No se encontraron centros de enfriamiento para tu código postal",
    legalAidTitle: "⚖️ Clínicas de Ayuda Legal para código postal",
    noLegalAid: "No se encontraron clínicas de ayuda legal para tu código postal",
    advocacyOrgsTitle: "📣 Organizaciones de Defensa en",
    noAdvocacyOrgs: "No se encontraron organizaciones de defensa para",
    retailersTitle: "🛒 Minoristas de Equipos de Enfriamiento en código postal",
    noRetailers: "No se encontraron minoristas para tu código postal",
    legalSupportTitle: "⚖️ Carta de Solicitud de Asistencia Legal",
    landlordLetterTitle: "🏢 Aviso de Cumplimiento para Propietario",
    startOver: "Comenzar de Nuevo",
    validationLanguage: "Por favor selecciona un idioma",
    validationName: "Por favor ingrese su nombre",
    validationAge: "Por favor ingrese su edad",
    validationTemperature: "Por favor ingrese la temperatura",
    validationTemperatureUnit: "Por favor selecciona una unidad de temperatura",
    validationZip: "Por favor ingresa un código postal válido de 5 dígitos",
    validationIncome: "Por favor selecciona un nivel de ingresos",
    validationAdvocacy: "Por favor selecciona un nivel de defensa",
    validationLandlord: "Por favor selecciona una opción",
    validationLegal: "Por favor selecciona una opción",
    loading: "Cargando tu plan de enfriamiento...",
    loadingDesc: "Por favor espera mientras preparamos tus recomendaciones personalizadas.",
    errorTitle: "Error al Cargar Datos",
    errorRefresh: "Por favor intenta actualizar la página o contacta con soporte.",
    zipRequired: "Por Favor Ingresa Tu Código Postal",
    zipRequiredDesc: "Necesitamos tu código postal para proporcionar información de enfriamiento relevante.",
    tryZipCodes: "Prueba uno de estos códigos postales para demostración:",
    goBack: "Regresar",
    noResourcesFound: "No Se Encontraron Recursos",
    noResourcesFoundDesc: "No pudimos encontrar recursos comunitarios para el código postal",
    restart: "Reiniciar Cuestionario",
    unitOption: "Unidad",
    buildingOption: "Edificio",
    neighborhoodOrBoroughOption: "Vecindario/Barrio",
    cityOption: "Ciudad"
  },
  中文: {
    languageTitle: "🌐 首选语言？",
    nameTitle: "您的名字是？",
    namePlaceholder: "在此输入您的名字...",
    ageTitle: "您的年龄？",
    agePlaceholder: "输入您的年龄...",
    temperatureTitle: "室内温度？",
    temperaturePlaceholder: "输入温度...",
    temperatureUnitTitle: "温度单位",
    fahrenheit: "华氏度",
    celsius: "摄氏度",
    locationTitle: "您在哪里？",
    zipPlaceholder: "邮政编码（例如10025、11201或11432）",
    addressPlaceholder: "完整地址（可选）",
    zipWarning: "请输入有效的5位邮政编码",
    incomeTitle: "收入水平？",
    lessThan20k: "低于$20,000",
    between20kAnd40k: "$20,000 – $40,000",
    between40kAnd60k: "$40,000 – $60,000",
    moreThan60k: "超过$60,000",
    advocacyTitle: "倡导级别？",
    unitOrBuilding: "单元或建筑",
    streetOrNeighborhood: "街道或社区",
    boroughOrCity: "区或城市",
    landlordTitle: "需要房东调解帮助？",
    yesNeedLetter: "是的，我需要一封信",
    noThanks: "不，谢谢",
    legalHelpTitle: "法律援助？",
    proBono: "公益服务",
    between100And300: "$100 – $300",
    between300And500: "$300 – $500",
    moreThan500: "$500+",
    noLegalHelp: "不需要法律帮助",
    back: "← 返回",
    next: "下一步 →",
    coolingNYCTitle: "CoolNYC",
    finalPlanTitle: "✅ 为您准备的最终降温计划",
    temperatureSection: "🌡️ 温度",
    indoor: "室内温度：",
    noTempProvided: "未提供温度信息",
    subsidySection: "💸 HEAP补贴资格",
    qualifyHeap: "您可能有资格获得纽约市HEAP补贴。",
    notQualifyHeap: "您可能不符合HEAP资格，但可以拨打311获取帮助。",
    noIncomeProvided: "请提供收入信息以检查资格",
    coolingCentersTitle: "🏬 邮编为以下的降温中心",
    noCoolingCenters: "未找到您邮编的降温中心",
    legalAidTitle: "⚖️ 邮编为以下的法律援助诊所",
    noLegalAid: "未找到您邮编的法律援助诊所",
    advocacyOrgsTitle: "📣 以下地区的倡导组织",
    noAdvocacyOrgs: "未找到以下地区的倡导组织",
    retailersTitle: "🛒 邮编为以下的降温设备零售商",
    noRetailers: "未找到您邮编的零售商",
    legalSupportTitle: "⚖️ 法律援助申请信",
    landlordLetterTitle: "🏢 业主合规通知",
    startOver: "重新开始",
    validationLanguage: "请选择一种语言",
    validationName: "请输入您的名字",
    validationAge: "请输入您的年龄",
    validationTemperature: "请输入温度",
    validationTemperatureUnit: "请选择温度单位",
    validationZip: "请输入有效的5位邮政编码",
    validationIncome: "请选择收入水平",
    validationAdvocacy: "请选择倡导级别",
    validationLandlord: "请选择一个选项",
    validationLegal: "请选择一个选项",
    loading: "正在加载您的降温计划...",
    loadingDesc: "请稍候，我们正在准备您的个性化建议。",
    errorTitle: "加载数据错误",
    errorRefresh: "请尝试刷新页面或联系支持。",
    zipRequired: "请输入您的邮政编码",
    zipRequiredDesc: "我们需要您的邮政编码来提供相关的降温信息。",
    tryZipCodes: "尝试以下演示邮政编码之一：",
    goBack: "返回",
    noResourcesFound: "未找到资源",
    noResourcesFoundDesc: "我们找不到邮政编码的社区资源",
    restart: "重新开始测验",
    unitOption: "单元",
    buildingOption: "建筑",
    neighborhoodOrBoroughOption: "街区/自治市区",
    cityOption: "城市"
  },
  বাংলা: {
    languageTitle: "🌐 পছন্দের ভাষা?",
    nameTitle: "আপনার নাম কি?",
    namePlaceholder: "এখানে আপনার নাম লিখুন...",
    ageTitle: "আপনার বয়স?",
    agePlaceholder: "আপনার বয়স লিখুন...",
    temperatureTitle: "ঘরের তাপমাত্রা?",
    temperaturePlaceholder: "তাপমাত্রা লিখুন...",
    temperatureUnitTitle: "তাপমাত্রার একক",
    fahrenheit: "ফারেনহাইট",
    celsius: "সেলসিয়াস",
    locationTitle: "আপনি কোথায় অবস্থিত?",
    zipPlaceholder: "জিপ কোড (যেমন 10025, 11201, বা 11432)",
    addressPlaceholder: "পূর্ণ ঠিকানা (ঐচ্ছিক)",
    zipWarning: "অনুগ্রহ করে একটি বৈধ 5-সংখ্যার জিপ কোড লিখুন",
    incomeTitle: "আয়ের স্তর?",
    lessThan20k: "$20,000 এর কম",
    between20kAnd40k: "$20,000 – $40,000",
    between40kAnd60k: "$40,000 – $60,000",
    moreThan60k: "$60,000 এর বেশি",
    advocacyTitle: "এডভোকেসি লেভেল?",
    unitOrBuilding: "ইউনিট বা বিল্ডিং",
    streetOrNeighborhood: "রাস্তা বা আশেপাশে",
    boroughOrCity: "বরো বা শহর",
    landlordTitle: "বাড়িওয়ালার মধ্যস্থতা সাহায্য?",
    yesNeedLetter: "হ্যাঁ, আমার একটি চিঠি দরকার",
    noThanks: "না, ধন্যবাদ",
    legalHelpTitle: "আইনি সাহায্য?",
    proBono: "প্রো বোনো",
    between100And300: "$100 – $300",
    between300And500: "$300 – $500",
    moreThan500: "$500+",
    noLegalHelp: "আইনি সাহায্যের প্রয়োজন নেই",
    back: "← পিছনে",
    next: "পরবর্তী →",
    coolingNYCTitle: "CoolNYC",
    finalPlanTitle: "✅ চূড়ান্ত কুলিং প্ল্যান",
    temperatureSection: "🌡️ তাপমাত্রা",
    indoor: "ঘরের তাপমাত্রা:",
    noTempProvided: "কোন তাপমাত্রা তথ্য প্রদান করা হয়নি",
    subsidySection: "💸 HEAP ভর্তুকি যোগ্যতা",
    qualifyHeap: "আপনি NYC HEAP ভর্তুকির জন্য যোগ্য হতে পারেন।",
    notQualifyHeap: "আপনি HEAP এর জন্য যোগ্য নাও হতে পারেন, তবে সহায়তার জন্য 311 কল করতে পারেন।",
    noIncomeProvided: "যোগ্যতা চেক করার জন্য আয়ের তথ্য দিন",
    coolingCentersTitle: "🏬 জিপ কোডের জন্য কুলিং সেন্টার",
    noCoolingCenters: "আপনার জিপ কোডের জন্য কোন কুলিং সেন্টার পাওয়া যায়নি",
    legalAidTitle: "⚖️ জিপ কোডের জন্য আইনি সহায়তা ক্লিনিক",
    noLegalAid: "আপনার জিপ কোডের জন্য কোন আইনি সহায়তা ক্লিনিক পাওয়া যায়নি",
    advocacyOrgsTitle: "📣 এডভোকেসি সংগঠন",
    noAdvocacyOrgs: "কোন এডভোকেসি সংগঠন পাওয়া যায়নি",
    retailersTitle: "🛒 জিপ কোডের জন্য কুলিং ইকুইপমেন্ট বিক্রেতা",
    noRetailers: "আপনার জিপ কোডের জন্য কোন বিক্রেতা পাওয়া যায়নি",
    legalSupportTitle: "⚖️ আইনি সহায়তা অনুরোধ পত্র",
    landlordLetterTitle: "🏢 সম্পত্তি মালিক অনুবর্তিতা বিজ্ঞপ্তি",
    startOver: "আবার শুরু করুন",
    validationLanguage: "অনুগ্রহ করে একটি ভাষা নির্বাচন করুন",
    validationName: "অনুগ্রহ করে আপনার নাম লিখুন",
    validationAge: "অনুগ্রহ করে আপনার বয়স লিখুন",
    validationTemperature: "অনুগ্রহ করে তাপমাত্রা লিখুন",
    validationTemperatureUnit: "অনুগ্রহ করে একটি তাপমাত্রা একক নির্বাচন করুন",
    validationZip: "অনুগ্রহ করে একটি বৈধ 5-সংখ্যার জিপ কোড লিখুন",
    validationIncome: "অনুগ্রহ করে একটি আয়ের স্তর নির্বাচন করুন",
    validationAdvocacy: "অনুগ্রহ করে একটি এডভোকেসি লেভেল নির্বাচন করুন",
    validationLandlord: "অনুগ্রহ করে একটি বিকল্প নির্বাচন করুন",
    validationLegal: "অনুগ্রহ করে একটি বিকল্প নির্বাচন করুন",
    loading: "আপনার কুলিং প্ল্যান লোড হচ্ছে...",
    loadingDesc: "অনুগ্রহ করে অপেক্ষা করুন, আমরা আপনার ব্যক্তিগতকৃত সুপারিশ প্রস্তুত করছি।",
    errorTitle: "ডেটা লোড করতে ত্রুটি",
    errorRefresh: "অনুগ্রহ করে পৃষ্ঠা রিফ্রেশ করুন বা সাপোর্টের সাথে যোগাযোগ করুন।",
    zipRequired: "অনুগ্রহ করে আপনার জিপ কোড লিখুন",
    zipRequiredDesc: "প্রাসঙ্গিক কুলিং তথ্য প্রদান করতে আমাদের আপনার জিপ কোড প্রয়োজন।",
    tryZipCodes: "ডেমোর জন্য এই জিপ কোডগুলির একটি চেষ্টা করুন:",
    goBack: "ফিরে যান",
    noResourcesFound: "কোন সম্পদ পাওয়া যায়নি",
    noResourcesFoundDesc: "আমরা জিপ কোডের জন্য কোন কমিউনিটি সম্পদ খুঁজে পাইনি",
    restart: "কুইজ পুনরায় শুরু করুন",
    unitOption: "ইউনিট",
    buildingOption: "বিল্ডিং",
    neighborhoodOrBoroughOption: "পাড়া/বরোর",
    cityOption: "শহর"
  },
  Русский: {
    languageTitle: "🌐 Предпочитаемый язык?",
    nameTitle: "Как вас зовут?",
    namePlaceholder: "Введите ваше имя здесь...",
    ageTitle: "Ваш возраст?",
    agePlaceholder: "Введите ваш возраст...",
    temperatureTitle: "Температура в помещении?",
    temperaturePlaceholder: "Введите температуру...",
    temperatureUnitTitle: "Единица измерения температуры",
    fahrenheit: "Фаренгейт",
    celsius: "Цельсий",
    locationTitle: "Где вы находитесь?",
    zipPlaceholder: "Почтовый индекс (например, 10025, 11201 или 11432)",
    addressPlaceholder: "Полный адрес (необязательно)",
    zipWarning: "Пожалуйста, введите действительный 5-значный почтовый индекс",
    incomeTitle: "Уровень дохода?",
    lessThan20k: "Менее $20,000",
    between20kAnd40k: "$20,000 – $40,000",
    between40kAnd60k: "$40,000 – $60,000",
    moreThan60k: "Более $60,000",
    advocacyTitle: "Уровень защиты?",
    unitOrBuilding: "Квартира или здание",
    streetOrNeighborhood: "Улица или район",
    boroughOrCity: "Округ или город",
    landlordTitle: "Помощь в посредничестве с арендодателем?",
    yesNeedLetter: "Да, мне нужно письмо",
    noThanks: "Нет, спасибо",
    legalHelpTitle: "Юридическая помощь?",
    proBono: "Про боно",
    between100And300: "$100 – $300",
    between300And500: "$300 – $500",
    moreThan500: "$500+",
    noLegalHelp: "Не нужна юридическая помощь",
    back: "← Назад",
    next: "Далее →",
    coolingNYCTitle: "CoolNYC",
    finalPlanTitle: "✅ Окончательный план охлаждения для",
    temperatureSection: "🌡️ Температура",
    indoor: "Температура в помещении:",
    noTempProvided: "Информация о температуре не предоставлена",
    subsidySection: "💸 Право на субсидию HEAP",
    qualifyHeap: "Вы можете иметь право на субсидию NYC HEAP.",
    notQualifyHeap: "Вы можете не иметь права на HEAP, но можете позвонить по номеру 311 для получения помощи.",
    noIncomeProvided: "Пожалуйста, предоставьте информацию о доходе для проверки права",
    coolingCentersTitle: "🏬 Центры охлаждения для почтового индекса",
    noCoolingCenters: "Для вашего почтового индекса не найдено центров охлаждения",
    legalAidTitle: "⚖️ Юридические клиники для почтового индекса",
    noLegalAid: "Для вашего почтового индекса не найдено юридических клиник",
    advocacyOrgsTitle: "📣 Организации защиты в",
    noAdvocacyOrgs: "Не найдено организаций защиты для",
    retailersTitle: "🛒 Продавцы оборудования для охлаждения по почтовому индексу",
    noRetailers: "Для вашего почтового индекса не найдено продавцов",
    legalSupportTitle: "⚖️ Письмо-запрос юридической помощи",
    landlordLetterTitle: "🏢 Уведомление о соответствии для владельца недвижимости",
    startOver: "Начать заново",
    validationLanguage: "Пожалуйста, выберите язык",
    validationName: "Пожалуйста, введите ваше имя",
    validationAge: "Пожалуйста, введите ваш возраст",
    validationTemperature: "Пожалуйста, введите температуру",
    validationTemperatureUnit: "Пожалуйста, выберите единицу измерения температуры",
    validationZip: "Пожалуйста, введите действительный 5-значный почтовый индекс",
    validationIncome: "Пожалуйста, выберите уровень дохода",
    validationAdvocacy: "Пожалуйста, выберите уровень защиты",
    validationLandlord: "Пожалуйста, выберите вариант",
    validationLegal: "Пожалуйста, выберите вариант",
    loading: "Загрузка вашего плана охлаждения...",
    loadingDesc: "Пожалуйста, подождите, пока мы подготовим ваши персонализированные рекомендации.",
    errorTitle: "Ошибка загрузки данных",
    errorRefresh: "Пожалуйста, попробуйте обновить страницу или обратитесь в службу поддержки.",
    zipRequired: "Пожалуйста, введите ваш почтовый индекс",
    zipRequiredDesc: "Нам нужен ваш почтовый индекс для предоставления соответствующей информации об охлаждении.",
    tryZipCodes: "Попробуйте один из этих почтовых индексов для демонстрации:",
    goBack: "Вернуться",
    noResourcesFound: "Ресурсы не найдены",
    noResourcesFoundDesc: "Мы не смогли найти общественные ресурсы для почтового индекса",
    restart: "Перезапустить Опрос",
    unitOption: "Квартира",
    buildingOption: "Здание",
    neighborhoodOrBoroughOption: "Район/боро",
    cityOption: "Город"
  }
};

// Helper function to get translated text
const getTranslatedText = (language, key) => {
  return translations[language] ? translations[language][key] : translations.English[key];
};

// Selection Card Component
const SelectionCard = ({ value, label, selectedValue, onChange, icon }) => {
  // Support both single and multi-select by checking array includes
  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : value === selectedValue;
  
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer border-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
        isSelected 
          ? 'border-blue-300 bg-blue-800 bg-opacity-80 shadow-blue-900/50' 
          : 'border-white border-opacity-20 bg-blue-900 bg-opacity-40 hover:border-opacity-50'
      }`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center">
        {icon && <span className="text-xl mr-2">{icon}</span>}
        <span className={`${isSelected ? 'font-bold' : ''}`}>{label}</span>
      </div>
    </div>
  );
};

const CoolingNYCApp = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [resourceData, setResourceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [showLovedOnesOptions, setShowLovedOnesOptions] = useState(false);

  // Load JSON data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Add cache-busting query parameter
        const response = await fetch(`/community_resources_by_zip.json?t=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error(`Failed to load community resources: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Community resources loaded successfully", data);
        setResourceData(data);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Form handlers
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(""); // Clear validation error when a selection is made
  };
  
  // ZIP code validation
  const isValidZip = (zip) => {
    return /^\d{5}$/.test(zip);
  };
  
  // Get the current language
  const currentLanguage = formData.language || "English";
  
  // Translation helper for the current language
  const translate = (key) => getTranslatedText(currentLanguage, key);
  
  // Device toggle helper for multi-select
  const toggleDevice = (device) => {
    setFormData(prev => {
      const devices = prev.devices || [];
      return devices.includes(device)
        ? { ...prev, devices: devices.filter(d => d !== device) }
        : { ...prev, devices: [...devices, device] };
    });
    setValidationError("");
  };

  // Send check-in alert to loved ones via SMS or WhatsApp
  const sendLovedOnesAlert = (channel) => {
    const message = encodeURIComponent(`Hi! I'm checking on you because of the extreme heat in my area. Stay safe!`);
    const smsLink = `sms:&body=${message}`;
    const waLink = `https://wa.me/?text=${message}`;
    if (channel === 'whatsapp') {
      window.open(waLink, '_blank');
    } else if (channel === 'email') {
      window.open(`mailto:?body=${message}`, '_self');
    } else {
      window.open(smsLink, '_blank');
    }
  };

  // Form steps organized into single-page flows
  const steps = [
    // Landing Page
    <div key="landing" className="relative flex flex-col items-center justify-center h-screen bg-blue-900 overflow-hidden">
      {/* Particle animation background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = 8 + Math.random() * 12; // 8px to 20px
          return (
            <span
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>
      <div className="z-10 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold font-sans tracking-tight text-shadow text-white mb-6">
          CoolNYC
        </h1>
        <button
          onClick={() => setStep(1)}
          className="mt-8 px-8 py-4 bg-white text-blue-900 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Get Started
        </button>
      </div>
    </div>,

    // About You with name, age, income
    <div key="about" className="space-y-6">
      <h2 className="text-2xl font-bold text-white">About You</h2>
      <div className="flex space-x-3">
        <input type="text" placeholder="Name" className="flex-1 p-3 rounded-full bg-white text-black" value={formData.name||""} onChange={e=>handleChange("name",e.target.value)} />
        <input type="number" placeholder="Age" className="flex-1 p-3 rounded-full bg-white text-black" value={formData.age||""} onChange={e=>handleChange("age",e.target.value)} />
      </div>
      {/* Income subtitle */}
      <h3 className="text-lg font-medium text-white">Income</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "<$20k", label: "<$20k", icon: "💲" },
          { value: "$20k–$40k", label: "$20k–$40k", icon: "💲💲" },
          { value: "$40k–$60k", label: "$40k–$60k", icon: "💲💲💲" },
          { value: ">$60k", label: ">$60k", icon: "💲💲💲💲" }
        ].map(opt => (
          <SelectionCard
            key={opt.value}
            value={opt.value}
            label={opt.label}
            icon={opt.icon}
            selectedValue={formData.income}
            onChange={val => handleChange("income", val)}
          />
        ))}
      </div>
      {validationError&&step===1&&<p className="text-red-300">{validationError}</p>}
    </div>,

    // Your Location with address, zip, temperature
    <div key="location" className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Your Location</h2>
      <div className="flex space-x-3">
        <input type="text" placeholder="Full Address (Optional)" className="flex-1 p-3 rounded-full bg-white text-black" value={formData.address||""} onChange={e=>handleChange("address",e.target.value)} />
        <input type="text" placeholder="ZIP Code" className={`flex-1 p-3 rounded-full bg-white text-black ${formData.zip&&!isValidZip(formData.zip)?'border-red-500 border-2':''}`} value={formData.zip||""} onChange={e=>{handleChange("zip",e.target.value.trim()); if(!e.target.value||isValidZip(e.target.value))setValidationError("");}} />
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          placeholder="Indoor Temperature"
          className="flex-1 p-3 rounded-full bg-white text-black"
          value={formData.temperature||""}
          onChange={e=>handleChange("temperature",e.target.value)}
        />
        <button
          type="button"
          onClick={() => handleChange("temperatureUnit", formData.temperatureUnit === 'C' ? 'F' : 'C')}
          className="px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          °{formData.temperatureUnit || 'F'}
        </button>
      </div>
      {validationError&&step===2&&<p className="text-red-300">{validationError}</p>}
    </div>,

    // Cooling Products & Help
    <div key="products" className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Cooling Products & Help</h2>
      <h3 className="text-lg text-white">Select Device(s)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[{name:"Portable AC",icon:"🧊"},{name:"Fan",icon:"🌀"},{name:"Heat Pump",icon:"🔥"},{name:"Evaporative Cooler",icon:"💧"},{name:"Ice Cooler",icon:"❄️"},{name:"Thermal Cooler",icon:"🌡️"},{name:"Motion Cooler",icon:"🏃"},{name:"Wearable",icon:"👕"}].map(dev=>(
          <SelectionCard key={dev.name} value={dev.name} label={`${dev.icon} ${dev.name}`} selectedValue={formData.devices} onChange={()=>toggleDevice(dev.name)} />
        ))}
      </div>
      <h3 className="text-lg text-white">Match with Installer?</h3>
      <div className="grid grid-cols-2 gap-3"><SelectionCard value={true} label="Yes" selectedValue={formData.installerMatch} onChange={val=>handleChange("installerMatch",val)} /><SelectionCard value={false} label="No" selectedValue={formData.installerMatch} onChange={val=>handleChange("installerMatch",val)} /></div>
      <h3 className="text-lg text-white">Energy Bill Assistance?</h3>
      <div className="grid grid-cols-2 gap-3"><SelectionCard value={true} label="Yes" selectedValue={formData.energyAssistance} onChange={val=>handleChange("energyAssistance",val)} /><SelectionCard value={false} label="No" selectedValue={formData.energyAssistance} onChange={val=>handleChange("energyAssistance",val)} /></div>
      {validationError&&step===3&&<p className="text-red-300">{validationError}</p>}
    </div>,

    // Mediation Support
    <div key="mediation" className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{translate("advocacyTitle")}</h2>
      <h3 className="text-lg text-white">{translate("landlordTitle")}</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: true, label: translate("yesNeedLetter"), icon: "✉️" },
          { value: false, label: translate("noThanks"), icon: "❌" }
        ].map(opt => (
          <SelectionCard
            key={String(opt.value)}
            value={opt.value}
            label={opt.label}
            icon={opt.icon}
            selectedValue={formData.landlordHelp}
            onChange={val => handleChange("landlordHelp", val)}
          />
        ))}
      </div>
      <h3 className="text-lg text-white">{translate("legalHelpTitle")}</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "Pro bono", label: translate("proBono"), icon: "⚖️" },
          { value: "$100–$300", label: translate("between100And300"), icon: "💰" },
          { value: "$300–$500", label: translate("between300And500"), icon: "💰💰" },
          { value: "$500+", label: translate("moreThan500"), icon: "💰💰💰" },
          { value: "none", label: translate("noLegalHelp"), icon: "❌" }
        ].map(opt => (
          <SelectionCard
            key={opt.value}
            value={opt.value}
            label={opt.label}
            icon={opt.icon}
            selectedValue={formData.legalHelp}
            onChange={val => handleChange("legalHelp", val)}
          />
        ))}
      </div>
      {validationError&&step===4&&<p className="text-red-300">{validationError}</p>}
    </div>,

    // Advocacy
    <div key="advocacy" className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{translate("advocacyTitle")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { value: "unit", key: "unitOption", icon: "🏠" },
          { value: "building", key: "buildingOption", icon: "🏢" },
          { value: "neighborhoodOrBorough", key: "neighborhoodOrBoroughOption", icon: "🌆" },
          { value: "city", key: "cityOption", icon: "🌃" }
        ].map(opt => (
          <SelectionCard
            key={opt.value}
            value={opt.value}
            label={translate(opt.key)}
            icon={opt.icon}
            selectedValue={formData.advocacyOption}
            onChange={v => handleChange("advocacyOption", v)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setShowLovedOnesOptions(true)}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Check on your loved ones?
      </button>
      {showLovedOnesOptions && (
        <div className="flex space-x-3 mt-3">
          <button
            type="button"
            onClick={() => sendLovedOnesAlert('sms')}
            className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition flex items-center justify-center space-x-2"
          >
            <img src="/icons/iMessage.svg" alt="Message" className="w-6 h-6 filter brightness-0 invert" />
            <span>Message</span>
          </button>
          <button
            type="button"
            onClick={() => sendLovedOnesAlert('whatsapp')}
            className="flex-1 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
          >
            <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 filter brightness-0 invert" />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => sendLovedOnesAlert('email')}
            className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center justify-center space-x-2"
          >
            <span className="text-2xl">📧</span>
            <span>Email</span>
          </button>
        </div>
      )}
      {validationError && step===5 && <p className="text-red-300">{validationError}</p>}
    </div>,

    // Final Plan
    <FinalPlan key="final" formData={formData} resourceData={resourceData} isLoading={isLoading} error={error} />
  ];

  // If we're on the landing step, render it exclusively to avoid extra layout and scrolling
  if (step === 0) {
    return steps[0];
  }

  return (
    <div className="min-h-screen bg-blue-900">
      <div className="w-full max-w-4xl mx-auto p-6 text-white">
        {step > 0 && (
          <>
            <h2 className="text-center text-3xl font-bold mb-6 text-shadow">{translate("coolingNYCTitle")}</h2>
            {/* Progress bar */}
            <div className="w-full h-3 bg-blue-900 rounded-full overflow-hidden mb-8 shadow-inner">
              <div
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </>
        )}
        
        {/* Current step */}
        <div className="bg-blue-900 bg-opacity-30 p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white border-opacity-10">
          {steps[step]}
        </div>
        
        {/* Navigation buttons with Restart, hidden on landing page */}
        {step > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button onClick={() => setStep(step - 1)} className="px-6 py-3 bg-white text-blue-800 rounded-full shadow-lg">Back</button>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg">↺ Restart</button>
            {step < steps.length - 1 && (<button onClick={() => setStep(step + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg">Next</button>)}
          </div>
        )}
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ title, resource, language }) => {
  if (!resource) return null;
  
  // Translation for website link
  const websiteText = {
    "English": "Visit Website",
    "Español": "Visitar Sitio Web",
    "中文": "访问网站",
    "বাংলা": "ওয়েবসাইট দেখুন",
    "Русский": "Посетить Сайт"
  };
  
  return (
    <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 backdrop-blur-sm mb-3 border border-white border-opacity-10">
      <h4 className="font-medium text-lg">{title}</h4>
      <p className="mt-1">{resource.address}</p>
      <p className="text-blue-300">{resource.phone}</p>
      {resource.website && (
        <a 
          href={resource.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-300 hover:text-blue-200 hover:underline block mt-1 font-medium"
        >
          {websiteText[language] || websiteText["English"]}
        </a>
      )}
    </div>
  );
};

// Final Plan component
function FinalPlan({ formData, resourceData, isLoading, error }) {
  const { name, zip, temperature, temperatureUnit, income, address, legalHelp, landlordHelp } = formData;
  
  // Get the current language
  const currentLanguage = formData.language || "English";
  
  // Translation helper for the current language
  const translate = (key) => getTranslatedText(currentLanguage, key);
  
  // Add debugging for resources
  console.log("ZIP code:", zip);
  console.log("Resource data:", resourceData);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 text-white text-center">
        <h2 className="text-2xl font-bold">{translate("loading")}</h2>
        <p>{translate("loadingDesc")}</p>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="space-y-6 text-white">
        <h2 className="text-2xl font-bold text-red-300">{translate("errorTitle")}</h2>
        <p>{error}</p>
        <p>{translate("errorRefresh")}</p>
      </div>
    );
  }
  
  // Handle missing zip code
  if (!zip) {
    return (
      <div className="space-y-6 text-white">
        <h2 className="text-2xl font-bold">{translate("zipRequired")}</h2>
        <p>{translate("zipRequiredDesc")}</p>
        <p className="mt-4">{translate("tryZipCodes")}</p>
        <ul className="list-disc ml-8 mt-2">
          <li>10025 - Manhattan</li>
          <li>11201 - Brooklyn</li>
          <li>11432 - Queens</li>
        </ul>
        <button 
          className="px-5 py-2 bg-white text-blue-800 rounded-full mt-4" 
          onClick={() => window.history.back()}
        >
          {translate("goBack")}
        </button>
      </div>
    );
  }
  
  // Get resources for the ZIP code
  const zipResources = resourceData && resourceData[zip];
  console.log("Resources for ZIP", zip, ":", zipResources);
  
  if (!zipResources) {
    return (
      <div className="space-y-6 text-white">
        <h2 className="text-2xl font-bold">{translate("noResourcesFound")}</h2>
        <p>{translate("noResourcesFoundDesc")} {zip}.</p>
        <p className="mt-4">{translate("tryZipCodes")}</p>
        <ul className="list-disc ml-8 mt-2">
          <li>10025 - Manhattan</li>
          <li>11201 - Brooklyn</li>
          <li>11432 - Queens</li>
        </ul>
      </div>
    );
  }
  
  // Extract resources from the data
  const coolingCenters = zipResources["Cooling Centers"] || [];
  const legalAidClinics = zipResources["Legal Aid Clinics"] || [];
  const advocacyOrgs = zipResources["Advocacy Organizations"] || [];
  const retailers = zipResources["Retailers"] || [];
  
  console.log("Cooling Centers:", coolingCenters);
  console.log("Legal Aid Clinics:", legalAidClinics);
  console.log("Advocacy Orgs:", advocacyOrgs);
  console.log("Retailers:", retailers);
  
  // Determine borough from ZIP
  let borough = "unknown";
  if (zip.startsWith("10")) borough = "Manhattan";
  else if (zip.startsWith("11") && parseInt(zip.charAt(2)) < 4) borough = "Brooklyn";
  else if (zip.startsWith("11") && parseInt(zip.charAt(2)) >= 4) borough = "Queens";

  // Get letter content (always in English regardless of selected language)
  const getLegalLetterContent = () => {
    // Always return English version regardless of the currentLanguage
    return `Dear Legal Representative,

I am writing to request ${legalHelp} legal assistance regarding unsafe heat conditions at my residence located at ${address || "[Your Address]"}, ZIP ${zip}.

The indoor temperature has reached ${temperature ? `${temperature}°${temperatureUnit || "F"}` : "unsafe levels"}, which violates NYC housing maintenance code requirements for safe living conditions. I have already ${landlordHelp === true ? "contacted my landlord" : "attempted to resolve this issue"}, but require professional legal support to ensure my rights as a tenant are protected.

I am seeking representation for a potential case concerning these unsafe heat conditions, and am prepared to allocate ${legalHelp === "Pro bono" ? "minimal resources as I qualify for pro bono assistance" : legalHelp} for legal fees to address this matter.

Please contact me at your earliest convenience to discuss my case and possible legal remedies.

Sincerely,
${name || "Resident"}`;
  };

  const getLandlordLetterContent = () => {
    // Always return English version regardless of the currentLanguage
    return `Dear Property Owner/Manager,

RE: Urgent Request for Cooling Remediation at ${address || "[Your Address]"}, ZIP ${zip}

This letter serves as a formal notification that the indoor temperature at my residence has reached ${temperature ? `${temperature}°${temperatureUnit || "F"}` : "unsafe levels"}, creating unacceptable living conditions that may violate NYC housing codes and regulations.

According to New York City housing maintenance code and the warranty of habitability (NYC Admin Code § 27-2005), landlords are required to maintain habitable living conditions for tenants, which includes protection from extreme heat. During summer months, this means ensuring reasonable cooling options are available.

I am requesting that you take immediate action within 48 hours to address this issue by:
1. Providing or repairing air conditioning units
2. Ensuring proper ventilation and airflow in the building
3. Addressing any insulation issues contributing to heat retention
4. Taking any other necessary measures to bring indoor temperatures to safe levels

If I do not receive a response or if no corrective action is taken within the specified timeframe, I will be forced to pursue other remedies available to me under New York tenant protection laws, including contacting the NYC Department of Housing Preservation and Development.

I look forward to your prompt attention to this matter.

Sincerely,
${name || "Resident"}`;
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold">{translate("finalPlanTitle")} {name || "You"}</h2>

      {/* Health Warning */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">Health Warning</h3>
        <p>Extreme heat can be dangerous, especially for young children, older adults, and people with health conditions. Stay hydrated, seek shade, and consult a medical professional if you feel unwell.</p>
      </div>

      {/* Subsidy Eligibility */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">Subsidy Eligibility</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li><a href="https://www.nyc.gov/site/acs/services/food-assistance/heap.page" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">NYC HEAP Subsidy</a></li>
          <li><a href="https://www1.nyc.gov/site/nycha/index.page" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">NYCHA Cooling Assistance</a></li>
        </ul>
      </div>

      {/* Cooling Centers (max 3) */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">{translate("coolingCentersTitle")} {zip}</h3>
        {coolingCenters.length > 0 ? (
          <div className="space-y-2">
            {coolingCenters.slice(0,3).map((center, idx) => (
              <ResourceCard key={idx} title={center.name} resource={center} language={currentLanguage} />
            ))}
          </div>
        ) : (
          <p>{translate("noCoolingCenters")}</p>
        )}
      </div>

      {/* Cooling Devices */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">Cooling Devices</h3>
        <p>Local retailers near you:</p>
        <ul className="list-disc ml-6 space-y-1">
          {retailers.slice(0,3).map((r, i) => (
            <li key={i}><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}`} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">{r.name}</a></li>
          ))}
        </ul>
        <p className="mt-2">Online options:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><a href="https://www.amazon.com/s?k=portable+air+conditioner" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">Amazon - Portable AC</a></li>
          <li><a href="https://www.homedepot.com/b/Heating-Venting-Cooling-Air-Conditioning-Portable-Air-Conditioners" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">Home Depot - AC Units</a></li>
          <li><a href="https://www.taskrabbit.com/" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">TaskRabbit Installation</a></li>
        </ul>
      </div>

      {/* Energy Savings Tips */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">Energy Bill Savings Guide</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Set your thermostat as high as comfortably possible.</li>
          <li>Use ceiling fans to reduce AC needs.</li>
          <li>Seal windows and doors to prevent cool air loss.</li>
        </ul>
      </div>

      {/* Legal Aid Clinics */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">{translate("legalAidTitle")} {zip}</h3>
        {legalAidClinics.length > 0 ? (
          <div className="space-y-2">
            {legalAidClinics.slice(0,3).map((clinic, idx) => (
              <ResourceCard key={idx} title={clinic.name} resource={clinic} language={currentLanguage} />
            ))}
          </div>
        ) : (
          <p>{translate("noLegalAid")}</p>
        )}
      </div>

      {/* Advocacy Organizations */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">{translate("advocacyOrgsTitle")} {borough}</h3>
        {advocacyOrgs.length > 0 ? (
          <div className="space-y-2">
            {advocacyOrgs.map((org, idx) => (
              <ResourceCard key={idx} title={org.name} resource={org} language={currentLanguage} />
            ))}
          </div>
        ) : (
          <p>{translate("noAdvocacyOrgs")} {borough}</p>
        )}
      </div>

      {/* Retailers */}
      <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
        <h3 className="font-semibold text-lg mb-2">{translate("retailersTitle")} {zip}</h3>
        {retailers.length > 0 ? (
          <div className="space-y-2">
            {retailers.map((retailer, idx) => (
              <ResourceCard key={idx} title={retailer.name} resource={retailer} language={currentLanguage} />
            ))}
          </div>
        ) : (
          <p>{translate("noRetailers")}</p>
        )}
      </div>

      {legalHelp && legalHelp !== "No" && (
        <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
          <h3 className="font-semibold text-lg">{translate("legalSupportTitle")}</h3>
          <textarea
            className="w-full p-4 mt-2 text-black bg-gray-100 rounded-lg shadow-inner"
            rows={6}
            readOnly
            value={getLegalLetterContent()}
          />
        </div>
      )}
      {landlordHelp === true && (
        <div className="bg-blue-800 bg-opacity-50 p-5 rounded-xl shadow-lg border border-blue-200 border-opacity-20">
          <h3 className="font-semibold text-lg">{translate("landlordLetterTitle")}</h3>
          <textarea
            className="w-full p-4 mt-2 text-black bg-gray-100 rounded-lg shadow-inner"
            rows={6}
            readOnly
            value={getLandlordLetterContent()}
          />
        </div>
      )}
    </div>
  );
}

export default CoolingNYCApp;