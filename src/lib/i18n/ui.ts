/**
 * The words the site frame is built from — navigation, buttons, labels.
 *
 * Separate from the page content in `content.ts`, which is long-form copy that
 * belongs in the CMS and goes through the translation cache. These are short,
 * fixed, and change about once a year, so they live in the repository where
 * they can be reviewed in a diff.
 *
 * English is the source of truth and the shape every other language is checked
 * against: `mr` and `hi` are typed as a deep partial of it, so a missing key
 * falls back to English and a key that no longer exists is a type error.
 *
 * On the Marathi and Hindi below: product names and trade terms stay in
 * English, because that is how the industry speaks. A dealer reading
 * "जिप्सम प्लास्टर वन कोट" does not recognise the product they were sold.
 * They are written here rather than machine-translated so somebody at Buildon
 * can correct them in a pull request.
 */

export const en = {
  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    clientele: "Clientele",
    projects: "Projects",
    careers: "Careers",
    blog: "Blog",
    contact: "Contact Us",
    faqs: "FAQs",
  },
  actions: {
    readMore: "Read More",
    viewMore: "View More",
    knowMore: "Know More",
    download: "Download",
    getQuote: "Get a Quote",
    submit: "Submit",
    send: "Send",
    callUs: "Call Us",
    menu: "Menu",
    close: "Close",
  },
  form: {
    name: "Full Name",
    email: "Your Mail Id",
    phone: "Your Phone Number",
    message: "Your Message",
    company: "Company Name",
    enquiryType: "Enquiry Type",
    product: "Which Product",
    required: "required",
  },
  misc: {
    language: "Language",
    searchPlaceholder: "Search",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  /* The chat widget's own controls.
     
     Only the chrome lives here — the greeting, the menu options and the
     scripted answers come from `chat` in content.ts and are English for now.
     These are the strings the HTML translation pass can never reach, because
     the panel is closed when the page is built, so they appear in no built
     file. A screen reader on a Marathi page would otherwise announce the
     controls in English. */
  /**
   * The enquiry form, in full.
   *
   * It lives in a client component, so the build-time translation pass cannot
   * reach it: that pass rewrites the HTML of each locale, and a form's labels
   * are also in the shared JavaScript bundle — one copy for all three
   * languages. React put the English back a heartbeat after a Marathi page
   * loaded. These are the words themselves, chosen per locale at render.
   *
   * Product NAMES are deliberately not here. "Gypsum Plaster One Coat" is what
   * the bag says and what a dealer asks for; translating it would describe a
   * product nobody sells.
   */
  enquiry: {
    labels: {
      name: "Name",
      phone: "Phone Number",
      email: "Email",
      company: "Company Name (if applicable)",
      enquiryType: "Enquiry Type",
      product: "Which Product",
      quantity: "How Many Tons Do You Need",
      message: "Type Your Enquiry",
    },
    placeholders: {
      name: "Your full name",
      phone: "9876543210",
      email: "you@company.com",
      company: "Company name",
      enquiryType: "Select…",
      product: "Select a product…",
      quantity: "30",
      message: "Message",
    },
    /* Who is asking. Translated, unlike the product names: a homeowner and a
       contractor are roles, not things on a price list. */
    types: [
      "Architect",
      "Contractor",
      "Dealer / Distributor",
      "Builder / Developer",
      "Interior Designer",
      "Homeowner",
      "Consultant",
      "Other",
    ],
    submit: "Submit",
    sending: "Sending…",
    errors: {
      name: "Please enter your name.",
      nameLong: "That is too long for a name.",
      email: "Please enter a valid email address.",
      emailLong: "That address is too long.",
      phone: "Please enter a reachable phone number.",
      phoneLong: "That is too long for a phone number.",
      message: "Tell us a little about your requirement.",
      messageLong: "That is longer than we can accept — please shorten it a little.",
    },
    sentTitle: "Thank you — we have your enquiry.",
    sentBody: "Someone from the team will be in touch.",
    sentAgain: "Send another",
    failed:
      "We could not send that just now. An email is opening with your message — send it, or call us.",
  },
  chat: {
    closeChat: "Close chat",
    /* The panel's own words. The scripted ANSWERS — what a product is, which
       projects we supplied — stay in content.ts and stay English: they are
       long marketing copy, and a page of it hand-written three times is a page
       that goes out of step three times. The frame is what a visitor meets
       first, and the frame is here. */
    subtitle: "Virtual Customer Care",
    launcher: "Chat with us",
    greeting: "Hi. How can I help you today?",
    menuPrompt: "Would you like to see",
    menuAgain: "Anything else?",
    placeholder: "Type your message …",
    fallback:
      "I did not quite catch that. Pick one of the options below, or choose “Leave an enquiry” and a person will reply.",
    options: {
      products: "Our Products",
      projects: "Projects We Have Supplied",
      enquiry: "Leave an Enquiry",
      contact: "Call or Email Us",
    },
    ask: {
      name: "Happy to help. What is your name?",
      phone: "Thanks, {name}. What number can we reach you on?",
      email: "And an email address, so we can send the quotation in writing?",
      product: "Which product is this about? Pick one, or tell me what the job is and I will pass it on.",
      branch: "Which branch should supply it?",
      quantity: "Roughly how many tons do you need? A number is fine.",
      quantityAt: "The minimum order in {branch} is {tons} tons. How many tons do you need?",
      place: "Where is the site? The city is enough.",
      timeline: "And when do you need it?",
    },
    invalid: {
      name: "Please type your name.",
      phone: "That does not look like a reachable number — please include the full number.",
      email: "That does not look like an email address.",
      product: "Pick one above, or describe the job in a few words.",
      branch: "Pick a branch above, or press Skip.",
      quantity: "Just the number of tons — or press Skip.",
      place: "Which city is the site in?",
    },
    notSure: "Not sure yet",
    timeline: ["Immediately", "This month", "In 1 – 3 months", "Just comparing for now"],
    skip: "Skip",
    sending: "Thank you — sending that across now …",
    done: "That is with our team, {name}. Someone will call you on {phone}, usually within one working day.",
    failed:
      "I could not send that from here. I have opened an email with everything you told me — send it and we will pick it up.",
    cancelled: "No problem — I have dropped that. What else can I help with?",
    showMenu: "Show the menu",
    cancelEnquiry: "Cancel this enquiry",
  },
  branches: {
    label: "Show products available in",
    all: "All branches",
    minimum: "Minimum order in {branch}: {tons} tons",
    none: "No products are listed for {branch} yet.",
    form: "Your Branch",
    choose: "Select a branch…",
    other: "Other / not listed",
  },
} as const;

export type Dictionary = typeof en;

/**
 * Every level optional, so a language may translate as much as it has.
 *
 * Leaves widen to `string`: English is declared `as const`, which makes each
 * value its own literal type, and a Marathi string is not assignable to the
 * type `"Home"`. The shape is what has to match, not the words.
 */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : string;
};

export const mr: DeepPartial<Dictionary> = {
  nav: {
    home: "मुख्यपृष्ठ",
    about: "आमच्याविषयी",
    products: "उत्पादने",
    clientele: "ग्राहक",
    projects: "प्रकल्प",
    careers: "करिअर",
    blog: "ब्लॉग",
    contact: "संपर्क",
    faqs: "प्रश्न",
  },
  actions: {
    readMore: "अधिक वाचा",
    viewMore: "अधिक पहा",
    knowMore: "अधिक जाणून घ्या",
    download: "डाउनलोड",
    getQuote: "दर विचारा",
    submit: "पाठवा",
    send: "पाठवा",
    callUs: "फोन करा",
    menu: "मेनू",
    close: "बंद करा",
  },
  form: {
    name: "पूर्ण नाव",
    email: "तुमचा ईमेल",
    phone: "तुमचा फोन नंबर",
    message: "तुमचा संदेश",
    company: "कंपनीचे नाव",
    enquiryType: "चौकशीचा प्रकार",
    product: "कोणते उत्पादन",
    required: "आवश्यक",
  },
  misc: {
    language: "भाषा",
    searchPlaceholder: "शोधा",
    backToTop: "वर जा",
    openMenu: "मेनू उघडा",
    closeMenu: "मेनू बंद करा",
  },
  enquiry: {
    labels: {
      name: "नाव",
      phone: "फोन नंबर",
      email: "ईमेल",
      company: "कंपनीचे नाव (असल्यास)",
      enquiryType: "चौकशीचा प्रकार",
      product: "कोणते उत्पादन",
      quantity: "किती टन हवे आहेत",
      message: "तुमची चौकशी लिहा",
    },
    placeholders: {
      name: "तुमचे पूर्ण नाव",
      phone: "9876543210",
      email: "you@company.com",
      company: "कंपनीचे नाव",
      enquiryType: "निवडा…",
      product: "उत्पादन निवडा…",
      quantity: "30",
      message: "संदेश",
    },
    types: [
      "आर्किटेक्ट",
      "कॉन्ट्रॅक्टर",
      "डीलर / वितरक",
      "बिल्डर / डेव्हलपर",
      "इंटिरियर डिझायनर",
      "घरमालक",
      "सल्लागार",
      "इतर",
    ],
    submit: "पाठवा",
    sending: "पाठवत आहे…",
    errors: {
      name: "कृपया तुमचे नाव लिहा.",
      nameLong: "हे नाव खूप लांब आहे.",
      email: "कृपया योग्य ईमेल पत्ता लिहा.",
      emailLong: "हा पत्ता खूप लांब आहे.",
      phone: "कृपया संपर्क होईल असा फोन नंबर लिहा.",
      phoneLong: "हा फोन नंबर खूप लांब आहे.",
      message: "तुम्हाला काय हवे आहे ते थोडक्यात सांगा.",
      messageLong: "हा संदेश आम्ही घेऊ शकतो त्यापेक्षा मोठा आहे — थोडा लहान करा.",
    },
    sentTitle: "धन्यवाद — तुमची चौकशी आम्हाला मिळाली.",
    sentBody: "आमच्या टीममधून कोणीतरी तुमच्याशी संपर्क करेल.",
    sentAgain: "आणखी एक पाठवा",
    failed:
      "हे आत्ता पाठवता आले नाही. तुमच्या संदेशासह ईमेल उघडत आहे — तो पाठवा, किंवा आम्हाला फोन करा.",
  },
  chat: {
    closeChat: "चॅट बंद करा",
    subtitle: "व्हर्च्युअल ग्राहक सेवा",
    launcher: "आमच्याशी चॅट करा",
    greeting: "नमस्कार. मी तुम्हाला कशी मदत करू?",
    menuPrompt: "तुम्हाला काय पाहायचे आहे",
    menuAgain: "आणखी काही?",
    placeholder: "तुमचा संदेश लिहा …",
    fallback:
      "मला ते नीट समजले नाही. खालील पर्यायांपैकी एक निवडा, किंवा “चौकशी नोंदवा” निवडा — आमच्यातील कोणीतरी उत्तर देईल.",
    options: {
      products: "आमची उत्पादने",
      projects: "आम्ही पुरवठा केलेले प्रकल्प",
      enquiry: "चौकशी नोंदवा",
      contact: "फोन किंवा ईमेल करा",
    },
    ask: {
      name: "नक्कीच मदत करतो. तुमचे नाव काय?",
      phone: "धन्यवाद, {name}. कोणत्या नंबरवर संपर्क करू?",
      email: "आणि ईमेल पत्ता, जेणेकरून कोटेशन लेखी पाठवता येईल?",
      product: "हे कोणत्या उत्पादनाबद्दल आहे? एक निवडा, किंवा काम काय आहे ते सांगा — मी पुढे कळवतो.",
      branch: "कोणत्या शाखेतून पुरवठा हवा?",
      quantity: "साधारण किती टन लागतील? फक्त आकडा चालेल.",
      quantityAt: "{branch} मध्ये किमान ऑर्डर {tons} टन आहे. तुम्हाला किती टन लागतील?",
      place: "साइट कुठे आहे? शहराचे नाव पुरे.",
      timeline: "आणि तुम्हाला कधी लागेल?",
    },
    invalid: {
      name: "कृपया तुमचे नाव लिहा.",
      phone: "हा संपर्क होईल असा नंबर वाटत नाही — कृपया पूर्ण नंबर लिहा.",
      email: "हा ईमेल पत्ता वाटत नाही.",
      product: "वरील पैकी एक निवडा, किंवा काम दोन शब्दांत सांगा.",
      branch: "वरील पैकी शाखा निवडा, किंवा वगळा दाबा.",
      quantity: "फक्त टनचा आकडा — किंवा वगळा दाबा.",
      place: "साइट कोणत्या शहरात आहे?",
    },
    notSure: "अजून ठरले नाही",
    timeline: ["लगेच", "या महिन्यात", "१ – ३ महिन्यांत", "सध्या फक्त तुलना करतोय"],
    skip: "वगळा",
    sending: "धन्यवाद — आत्ता पाठवत आहे …",
    done: "ते आमच्या टीमकडे पोहोचले, {name}. कोणीतरी तुम्हाला {phone} वर फोन करेल, साधारण एका कामकाजाच्या दिवसात.",
    failed:
      "हे इथून पाठवता आले नाही. तुम्ही सांगितलेले सगळे घेऊन ईमेल उघडला आहे — तो पाठवा, आम्ही पुढे पाहू.",
    cancelled: "हरकत नाही — ते रद्द केले. आणखी कशात मदत करू?",
    showMenu: "मेनू दाखवा",
    cancelEnquiry: "ही चौकशी रद्द करा",
  },
  branches: {
    label: "या शाखेत उपलब्ध उत्पादने दाखवा",
    all: "सर्व शाखा",
    minimum: "{branch} मध्ये किमान ऑर्डर: {tons} टन",
    none: "{branch} साठी अजून कोणतीही उत्पादने नोंदवलेली नाहीत.",
    form: "तुमची शाखा",
    choose: "शाखा निवडा…",
    other: "इतर / यादीत नाही",
  },
};

export const hi: DeepPartial<Dictionary> = {
  nav: {
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    clientele: "ग्राहक",
    projects: "परियोजनाएँ",
    careers: "करियर",
    blog: "ब्लॉग",
    contact: "संपर्क",
    faqs: "सवाल",
  },
  actions: {
    readMore: "और पढ़ें",
    viewMore: "और देखें",
    knowMore: "और जानें",
    download: "डाउनलोड",
    getQuote: "कोटेशन लें",
    submit: "भेजें",
    send: "भेजें",
    callUs: "कॉल करें",
    menu: "मेन्यू",
    close: "बंद करें",
  },
  form: {
    name: "पूरा नाम",
    email: "आपका ईमेल",
    phone: "आपका फोन नंबर",
    message: "आपका संदेश",
    company: "कंपनी का नाम",
    enquiryType: "पूछताछ का प्रकार",
    product: "कौन सा उत्पाद",
    required: "आवश्यक",
  },
  misc: {
    language: "भाषा",
    searchPlaceholder: "खोजें",
    backToTop: "ऊपर जाएँ",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
  },
  enquiry: {
    labels: {
      name: "नाम",
      phone: "फोन नंबर",
      email: "ईमेल",
      company: "कंपनी का नाम (यदि हो)",
      enquiryType: "पूछताछ का प्रकार",
      product: "कौन सा उत्पाद",
      quantity: "कितने टन चाहिए",
      message: "अपनी पूछताछ लिखें",
    },
    placeholders: {
      name: "आपका पूरा नाम",
      phone: "9876543210",
      email: "you@company.com",
      company: "कंपनी का नाम",
      enquiryType: "चुनें…",
      product: "उत्पाद चुनें…",
      quantity: "30",
      message: "संदेश",
    },
    types: [
      "आर्किटेक्ट",
      "ठेकेदार",
      "डीलर / वितरक",
      "बिल्डर / डेवलपर",
      "इंटीरियर डिज़ाइनर",
      "गृहस्वामी",
      "सलाहकार",
      "अन्य",
    ],
    submit: "भेजें",
    sending: "भेजा जा रहा है…",
    errors: {
      name: "कृपया अपना नाम लिखें.",
      nameLong: "यह नाम बहुत लंबा है.",
      email: "कृपया सही ईमेल पता लिखें.",
      emailLong: "यह पता बहुत लंबा है.",
      phone: "कृपया ऐसा फोन नंबर लिखें जिस पर संपर्क हो सके.",
      phoneLong: "यह फोन नंबर बहुत लंबा है.",
      message: "आपको क्या चाहिए, थोड़ा बताइए.",
      messageLong: "यह संदेश हमारी सीमा से बड़ा है — इसे थोड़ा छोटा करें.",
    },
    sentTitle: "धन्यवाद — आपकी पूछताछ हमें मिल गई.",
    sentBody: "हमारी टीम से कोई आपसे संपर्क करेगा.",
    sentAgain: "एक और भेजें",
    failed:
      "यह अभी भेजा नहीं जा सका. आपके संदेश के साथ ईमेल खुल रहा है — उसे भेजें, या हमें कॉल करें.",
  },
  chat: {
    closeChat: "चैट बंद करें",
    subtitle: "वर्चुअल ग्राहक सेवा",
    launcher: "हमसे चैट करें",
    greeting: "नमस्ते. मैं आपकी क्या मदद करूँ?",
    menuPrompt: "आप क्या देखना चाहेंगे",
    menuAgain: "और कुछ?",
    placeholder: "अपना संदेश लिखें …",
    fallback:
      "मैं ठीक से समझ नहीं पाया. नीचे दिए विकल्पों में से एक चुनें, या “पूछताछ दर्ज करें” चुनें — हमारी टीम से कोई जवाब देगा.",
    options: {
      products: "हमारे उत्पाद",
      projects: "हमने जिन परियोजनाओं में सप्लाई की",
      enquiry: "पूछताछ दर्ज करें",
      contact: "कॉल या ईमेल करें",
    },
    ask: {
      name: "ज़रूर मदद करूँगा. आपका नाम क्या है?",
      phone: "धन्यवाद, {name}. किस नंबर पर संपर्क करें?",
      email: "और एक ईमेल पता, ताकि कोटेशन लिखित में भेज सकें?",
      product: "यह किस उत्पाद के बारे में है? एक चुनें, या काम क्या है बताइए — मैं आगे पहुँचा दूँगा.",
      branch: "किस शाखा से सप्लाई चाहिए?",
      quantity: "लगभग कितने टन चाहिए? सिर्फ संख्या काफी है.",
      quantityAt: "{branch} में न्यूनतम ऑर्डर {tons} टन है. आपको कितने टन चाहिए?",
      place: "साइट कहाँ है? शहर का नाम काफी है.",
      timeline: "और आपको कब चाहिए?",
    },
    invalid: {
      name: "कृपया अपना नाम लिखें.",
      phone: "यह ऐसा नंबर नहीं लगता जिस पर संपर्क हो सके — कृपया पूरा नंबर लिखें.",
      email: "यह ईमेल पता नहीं लगता.",
      product: "ऊपर से एक चुनें, या काम को दो शब्दों में बताएँ.",
      branch: "ऊपर से शाखा चुनें, या छोड़ें दबाएँ.",
      quantity: "सिर्फ टन की संख्या — या छोड़ें दबाएँ.",
      place: "साइट किस शहर में है?",
    },
    notSure: "अभी तय नहीं",
    timeline: ["तुरंत", "इसी महीने", "१ – ३ महीनों में", "अभी सिर्फ तुलना कर रहे हैं"],
    skip: "छोड़ें",
    sending: "धन्यवाद — अभी भेज रहा हूँ …",
    done: "यह हमारी टीम तक पहुँच गया, {name}. कोई आपको {phone} पर कॉल करेगा, आमतौर पर एक कार्यदिवस में.",
    failed:
      "यह यहाँ से भेजा नहीं जा सका. आपने जो बताया वह सब लेकर ईमेल खुल गया है — उसे भेजें, हम आगे देख लेंगे.",
    cancelled: "कोई बात नहीं — वह रद्द कर दिया. और किसमें मदद करूँ?",
    showMenu: "मेनू दिखाएँ",
    cancelEnquiry: "यह पूछताछ रद्द करें",
  },
  branches: {
    label: "इस शाखा में उपलब्ध उत्पाद दिखाएं",
    all: "सभी शाखाएं",
    minimum: "{branch} में न्यूनतम ऑर्डर: {tons} टन",
    none: "{branch} के लिए अभी कोई उत्पाद सूचीबद्ध नहीं है।",
    form: "आपकी शाखा",
    choose: "शाखा चुनें…",
    other: "अन्य / सूची में नहीं",
  },
};

/* Telugu and Kannada. Written by hand like the two above, so somebody at
   Buildon who reads them can correct a word in a pull request. */
export const te: DeepPartial<Dictionary> = {
  nav: {
    home: "హోమ్",
    about: "మా గురించి",
    products: "ఉత్పత్తులు",
    clientele: "కస్టమర్లు",
    projects: "ప్రాజెక్టులు",
    careers: "ఉద్యోగాలు",
    blog: "బ్లాగ్",
    contact: "సంప్రదించండి",
    faqs: "ప్రశ్నలు",
  },
  actions: {
    readMore: "మరింత చదవండి",
    viewMore: "మరిన్ని చూడండి",
    knowMore: "మరింత తెలుసుకోండి",
    download: "డౌన్‌లోడ్",
    getQuote: "కొటేషన్ పొందండి",
    submit: "సమర్పించండి",
    send: "పంపండి",
    callUs: "కాల్ చేయండి",
    menu: "మెనూ",
    close: "మూసివేయండి",
  },
  form: {
    name: "పూర్తి పేరు",
    email: "మీ ఈమెయిల్",
    phone: "మీ ఫోన్ నంబర్",
    message: "మీ సందేశం",
    company: "కంపెనీ పేరు",
    enquiryType: "విచారణ రకం",
    product: "ఏ ఉత్పత్తి",
    required: "తప్పనిసరి",
  },
  misc: {
    language: "భాష",
    searchPlaceholder: "వెతకండి",
    backToTop: "పైకి వెళ్లండి",
    openMenu: "మెనూ తెరవండి",
    closeMenu: "మెనూ మూసివేయండి",
  },
  enquiry: {
    labels: {
      name: "పేరు",
      phone: "ఫోన్ నంబర్",
      email: "ఈమెయిల్",
      company: "కంపెనీ పేరు (ఉంటే)",
      enquiryType: "విచారణ రకం",
      product: "ఏ ఉత్పత్తి",
      quantity: "మీకు ఎన్ని టన్నులు కావాలి",
      message: "మీ విచారణ రాయండి",
    },
    placeholders: {
      name: "మీ పూర్తి పేరు",
      company: "కంపెనీ పేరు",
      enquiryType: "ఎంచుకోండి…",
      product: "ఉత్పత్తిని ఎంచుకోండి…",
      message: "సందేశం",
    },
    types: [
      "ఆర్కిటెక్ట్",
      "కాంట్రాక్టర్",
      "డీలర్ / డిస్ట్రిబ్యూటర్",
      "బిల్డర్ / డెవలపర్",
      "ఇంటీరియర్ డిజైనర్",
      "ఇంటి యజమాని",
      "కన్సల్టెంట్",
      "ఇతర",
    ],
    submit: "సమర్పించండి",
    sending: "పంపుతోంది…",
    errors: {
      name: "దయచేసి మీ పేరు నమోదు చేయండి.",
      nameLong: "పేరుకు ఇది చాలా పొడవుగా ఉంది.",
      email: "దయచేసి సరైన ఈమెయిల్ చిరునామా నమోదు చేయండి.",
      emailLong: "ఈ చిరునామా చాలా పొడవుగా ఉంది.",
      phone: "దయచేసి సంప్రదించగలిగే ఫోన్ నంబర్ నమోదు చేయండి.",
      phoneLong: "ఫోన్ నంబర్‌కు ఇది చాలా పొడవుగా ఉంది.",
      message: "మీ అవసరం గురించి కొంచెం చెప్పండి.",
      messageLong: "ఇది మేము స్వీకరించగలిగే దానికంటే పొడవుగా ఉంది — దయచేసి కొంచెం తగ్గించండి.",
    },
    sentTitle: "ధన్యవాదాలు — మీ విచారణ మాకు అందింది.",
    sentBody: "మా బృందం నుండి ఎవరైనా మిమ్మల్ని సంప్రదిస్తారు.",
    sentAgain: "మరొకటి పంపండి",
    failed:
      "ప్రస్తుతం దీన్ని పంపలేకపోయాము. మీ సందేశంతో ఈమెయిల్ తెరుచుకుంటోంది — దాన్ని పంపండి, లేదా మాకు కాల్ చేయండి.",
  },
  chat: {
    closeChat: "చాట్ మూసివేయండి",
    subtitle: "వర్చువల్ కస్టమర్ కేర్",
    launcher: "మాతో చాట్ చేయండి",
    greeting: "నమస్తే. ఈ రోజు మీకు ఎలా సహాయం చేయగలను?",
    menuPrompt: "మీరు ఏమి చూడాలనుకుంటున్నారు",
    menuAgain: "ఇంకేమైనా?",
    placeholder: "మీ సందేశం టైప్ చేయండి …",
    fallback:
      "నాకు సరిగ్గా అర్థం కాలేదు. కింది ఎంపికలలో ఒకటి ఎంచుకోండి, లేదా “విచారణ ఇవ్వండి” ఎంచుకోండి, ఒక వ్యక్తి సమాధానం ఇస్తారు.",
    options: {
      products: "మా ఉత్పత్తులు",
      projects: "మేము సరఫరా చేసిన ప్రాజెక్టులు",
      enquiry: "విచారణ ఇవ్వండి",
      contact: "కాల్ లేదా ఈమెయిల్ చేయండి",
    },
    ask: {
      name: "సహాయం చేయడానికి సంతోషం. మీ పేరు ఏమిటి?",
      phone: "ధన్యవాదాలు, {name}. మిమ్మల్ని ఏ నంబర్‌లో సంప్రదించాలి?",
      email: "కొటేషన్ రాతపూర్వకంగా పంపడానికి, ఒక ఈమెయిల్ చిరునామా ఇవ్వగలరా?",
      product: "ఇది ఏ ఉత్పత్తి గురించి? ఒకటి ఎంచుకోండి, లేదా పని ఏమిటో చెప్పండి — నేను ముందుకు పంపుతాను.",
      branch: "ఏ బ్రాంచ్ నుండి సరఫరా కావాలి?",
      quantity: "సుమారు ఎన్ని టన్నులు కావాలి? సంఖ్య చాలు.",
      quantityAt: "{branch}లో కనీస ఆర్డర్ {tons} టన్నులు. మీకు ఎన్ని టన్నులు కావాలి?",
      place: "సైట్ ఎక్కడ ఉంది? నగరం పేరు చాలు.",
      timeline: "మరియు మీకు ఎప్పుడు కావాలి?",
    },
    invalid: {
      name: "దయచేసి మీ పేరు టైప్ చేయండి.",
      phone: "ఇది సంప్రదించగలిగే నంబర్‌లా లేదు — దయచేసి పూర్తి నంబర్ ఇవ్వండి.",
      email: "ఇది ఈమెయిల్ చిరునామాలా లేదు.",
      product: "పైన ఒకటి ఎంచుకోండి, లేదా పనిని కొన్ని మాటల్లో చెప్పండి.",
      branch: "పైన ఒక బ్రాంచ్ ఎంచుకోండి, లేదా దాటవేయి నొక్కండి.",
      quantity: "టన్నుల సంఖ్య మాత్రమే — లేదా దాటవేయి నొక్కండి.",
      place: "సైట్ ఏ నగరంలో ఉంది?",
    },
    notSure: "ఇంకా నిర్ణయించలేదు",
    timeline: ["వెంటనే", "ఈ నెలలో", "1 – 3 నెలల్లో", "ప్రస్తుతం పోల్చి చూస్తున్నాను"],
    skip: "దాటవేయి",
    sending: "ధన్యవాదాలు — ఇప్పుడే పంపుతున్నాను …",
    done: "అది మా బృందానికి చేరింది, {name}. సాధారణంగా ఒక పని దినంలో ఎవరైనా మీకు {phone}కి కాల్ చేస్తారు.",
    failed:
      "దీన్ని ఇక్కడి నుండి పంపలేకపోయాను. మీరు చెప్పినవన్నీ ఉన్న ఈమెయిల్ తెరిచాను — దాన్ని పంపండి, మేము చూసుకుంటాము.",
    cancelled: "పర్వాలేదు — దాన్ని రద్దు చేశాను. ఇంకా దేనిలో సహాయం చేయగలను?",
    showMenu: "మెనూ చూపించు",
    cancelEnquiry: "ఈ విచారణను రద్దు చేయండి",
  },
  branches: {
    label: "ఈ బ్రాంచ్‌లో లభించే ఉత్పత్తులు చూపించు",
    all: "అన్ని బ్రాంచ్‌లు",
    minimum: "{branch}లో కనీస ఆర్డర్: {tons} టన్నులు",
    none: "{branch}కి ఇంకా ఏ ఉత్పత్తులూ జాబితాలో లేవు.",
    form: "మీ బ్రాంచ్",
    choose: "బ్రాంచ్ ఎంచుకోండి…",
    other: "ఇతర / జాబితాలో లేదు",
  },
};

export const kn: DeepPartial<Dictionary> = {
  nav: {
    home: "ಮುಖಪುಟ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    products: "ಉತ್ಪನ್ನಗಳು",
    clientele: "ಗ್ರಾಹಕರು",
    projects: "ಯೋಜನೆಗಳು",
    careers: "ಉದ್ಯೋಗಗಳು",
    blog: "ಬ್ಲಾಗ್",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    faqs: "ಪ್ರಶ್ನೆಗಳು",
  },
  actions: {
    readMore: "ಇನ್ನಷ್ಟು ಓದಿ",
    viewMore: "ಇನ್ನಷ್ಟು ನೋಡಿ",
    knowMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    download: "ಡೌನ್‌ಲೋಡ್",
    getQuote: "ಕೊಟೇಶನ್ ಪಡೆಯಿರಿ",
    submit: "ಸಲ್ಲಿಸಿ",
    send: "ಕಳುಹಿಸಿ",
    callUs: "ಕರೆ ಮಾಡಿ",
    menu: "ಮೆನು",
    close: "ಮುಚ್ಚಿ",
  },
  form: {
    name: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ನಿಮ್ಮ ಇಮೇಲ್",
    phone: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ",
    message: "ನಿಮ್ಮ ಸಂದೇಶ",
    company: "ಕಂಪನಿ ಹೆಸರು",
    enquiryType: "ವಿಚಾರಣೆಯ ಪ್ರಕಾರ",
    product: "ಯಾವ ಉತ್ಪನ್ನ",
    required: "ಕಡ್ಡಾಯ",
  },
  misc: {
    language: "ಭಾಷೆ",
    searchPlaceholder: "ಹುಡುಕಿ",
    backToTop: "ಮೇಲಕ್ಕೆ ಹೋಗಿ",
    openMenu: "ಮೆನು ತೆರೆಯಿರಿ",
    closeMenu: "ಮೆನು ಮುಚ್ಚಿ",
  },
  enquiry: {
    labels: {
      name: "ಹೆಸರು",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
      email: "ಇಮೇಲ್",
      company: "ಕಂಪನಿ ಹೆಸರು (ಇದ್ದರೆ)",
      enquiryType: "ವಿಚಾರಣೆಯ ಪ್ರಕಾರ",
      product: "ಯಾವ ಉತ್ಪನ್ನ",
      quantity: "ನಿಮಗೆ ಎಷ್ಟು ಟನ್ ಬೇಕು",
      message: "ನಿಮ್ಮ ವಿಚಾರಣೆ ಬರೆಯಿರಿ",
    },
    placeholders: {
      name: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
      company: "ಕಂಪನಿ ಹೆಸರು",
      enquiryType: "ಆಯ್ಕೆಮಾಡಿ…",
      product: "ಉತ್ಪನ್ನವನ್ನು ಆಯ್ಕೆಮಾಡಿ…",
      message: "ಸಂದೇಶ",
    },
    types: [
      "ಆರ್ಕಿಟೆಕ್ಟ್",
      "ಕಾಂಟ್ರಾಕ್ಟರ್",
      "ಡೀಲರ್ / ವಿತರಕ",
      "ಬಿಲ್ಡರ್ / ಡೆವಲಪರ್",
      "ಇಂಟೀರಿಯರ್ ಡಿಸೈನರ್",
      "ಮನೆಯ ಮಾಲೀಕ",
      "ಸಲಹೆಗಾರ",
      "ಇತರೆ",
    ],
    submit: "ಸಲ್ಲಿಸಿ",
    sending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…",
    errors: {
      name: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
      nameLong: "ಹೆಸರಿಗೆ ಇದು ತುಂಬಾ ಉದ್ದವಾಗಿದೆ.",
      email: "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.",
      emailLong: "ಈ ವಿಳಾಸ ತುಂಬಾ ಉದ್ದವಾಗಿದೆ.",
      phone: "ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಬಹುದಾದ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
      phoneLong: "ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಇದು ತುಂಬಾ ಉದ್ದವಾಗಿದೆ.",
      message: "ನಿಮ್ಮ ಅಗತ್ಯದ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ತಿಳಿಸಿ.",
      messageLong: "ಇದು ನಾವು ಸ್ವೀಕರಿಸಬಹುದಾದದ್ದಕ್ಕಿಂತ ಉದ್ದವಾಗಿದೆ — ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.",
    },
    sentTitle: "ಧನ್ಯವಾದಗಳು — ನಿಮ್ಮ ವಿಚಾರಣೆ ನಮಗೆ ತಲುಪಿದೆ.",
    sentBody: "ನಮ್ಮ ತಂಡದಿಂದ ಯಾರಾದರೂ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.",
    sentAgain: "ಇನ್ನೊಂದು ಕಳುಹಿಸಿ",
    failed:
      "ಈಗ ಅದನ್ನು ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ನಿಮ್ಮ ಸಂದೇಶದೊಂದಿಗೆ ಇಮೇಲ್ ತೆರೆಯುತ್ತಿದೆ — ಅದನ್ನು ಕಳುಹಿಸಿ, ಅಥವಾ ನಮಗೆ ಕರೆ ಮಾಡಿ.",
  },
  chat: {
    closeChat: "ಚಾಟ್ ಮುಚ್ಚಿ",
    subtitle: "ವರ್ಚುವಲ್ ಗ್ರಾಹಕ ಸೇವೆ",
    launcher: "ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    greeting: "ನಮಸ್ಕಾರ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    menuPrompt: "ನೀವು ಏನನ್ನು ನೋಡಲು ಬಯಸುತ್ತೀರಿ",
    menuAgain: "ಇನ್ನೇನಾದರೂ?",
    placeholder: "ನಿಮ್ಮ ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ …",
    fallback:
      "ನನಗೆ ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ, ಅಥವಾ “ವಿಚಾರಣೆ ನೀಡಿ” ಆರಿಸಿ, ಒಬ್ಬರು ಉತ್ತರಿಸುತ್ತಾರೆ.",
    options: {
      products: "ನಮ್ಮ ಉತ್ಪನ್ನಗಳು",
      projects: "ನಾವು ಪೂರೈಸಿದ ಯೋಜನೆಗಳು",
      enquiry: "ವಿಚಾರಣೆ ನೀಡಿ",
      contact: "ಕರೆ ಅಥವಾ ಇಮೇಲ್ ಮಾಡಿ",
    },
    ask: {
      name: "ಸಹಾಯ ಮಾಡಲು ಸಂತೋಷ. ನಿಮ್ಮ ಹೆಸರೇನು?",
      phone: "ಧನ್ಯವಾದಗಳು, {name}. ನಿಮ್ಮನ್ನು ಯಾವ ಸಂಖ್ಯೆಯಲ್ಲಿ ಸಂಪರ್ಕಿಸಬೇಕು?",
      email: "ಕೊಟೇಶನ್ ಅನ್ನು ಬರವಣಿಗೆಯಲ್ಲಿ ಕಳುಹಿಸಲು, ಒಂದು ಇಮೇಲ್ ವಿಳಾಸ ನೀಡುವಿರಾ?",
      product: "ಇದು ಯಾವ ಉತ್ಪನ್ನದ ಬಗ್ಗೆ? ಒಂದನ್ನು ಆರಿಸಿ, ಅಥವಾ ಕೆಲಸ ಏನೆಂದು ಹೇಳಿ — ನಾನು ಮುಂದೆ ತಿಳಿಸುತ್ತೇನೆ.",
      branch: "ಯಾವ ಶಾಖೆಯಿಂದ ಪೂರೈಕೆ ಬೇಕು?",
      quantity: "ಸುಮಾರು ಎಷ್ಟು ಟನ್ ಬೇಕು? ಸಂಖ್ಯೆ ಸಾಕು.",
      quantityAt: "{branch}ನಲ್ಲಿ ಕನಿಷ್ಠ ಆರ್ಡರ್ {tons} ಟನ್. ನಿಮಗೆ ಎಷ್ಟು ಟನ್ ಬೇಕು?",
      place: "ಸೈಟ್ ಎಲ್ಲಿದೆ? ನಗರದ ಹೆಸರು ಸಾಕು.",
      timeline: "ಮತ್ತು ನಿಮಗೆ ಯಾವಾಗ ಬೇಕು?",
    },
    invalid: {
      name: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ.",
      phone: "ಇದು ಸಂಪರ್ಕಿಸಬಹುದಾದ ಸಂಖ್ಯೆಯಂತೆ ಕಾಣುತ್ತಿಲ್ಲ — ದಯವಿಟ್ಟು ಪೂರ್ಣ ಸಂಖ್ಯೆ ನೀಡಿ.",
      email: "ಇದು ಇಮೇಲ್ ವಿಳಾಸದಂತೆ ಕಾಣುತ್ತಿಲ್ಲ.",
      product: "ಮೇಲಿನವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ, ಅಥವಾ ಕೆಲಸವನ್ನು ಕೆಲವು ಪದಗಳಲ್ಲಿ ತಿಳಿಸಿ.",
      branch: "ಮೇಲೆ ಒಂದು ಶಾಖೆಯನ್ನು ಆರಿಸಿ, ಅಥವಾ ಬಿಟ್ಟುಬಿಡಿ ಒತ್ತಿ.",
      quantity: "ಟನ್ ಸಂಖ್ಯೆ ಮಾತ್ರ — ಅಥವಾ ಬಿಟ್ಟುಬಿಡಿ ಒತ್ತಿ.",
      place: "ಸೈಟ್ ಯಾವ ನಗರದಲ್ಲಿದೆ?",
    },
    notSure: "ಇನ್ನೂ ನಿರ್ಧರಿಸಿಲ್ಲ",
    timeline: ["ತಕ್ಷಣ", "ಈ ತಿಂಗಳು", "1 – 3 ತಿಂಗಳಲ್ಲಿ", "ಸದ್ಯಕ್ಕೆ ಹೋಲಿಸುತ್ತಿದ್ದೇನೆ"],
    skip: "ಬಿಟ್ಟುಬಿಡಿ",
    sending: "ಧನ್ಯವಾದಗಳು — ಈಗಲೇ ಕಳುಹಿಸುತ್ತಿದ್ದೇನೆ …",
    done: "ಅದು ನಮ್ಮ ತಂಡಕ್ಕೆ ತಲುಪಿದೆ, {name}. ಸಾಮಾನ್ಯವಾಗಿ ಒಂದು ಕೆಲಸದ ದಿನದೊಳಗೆ ಯಾರಾದರೂ ನಿಮಗೆ {phone}ಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.",
    failed:
      "ಇದನ್ನು ಇಲ್ಲಿಂದ ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ನೀವು ಹೇಳಿದ ಎಲ್ಲವನ್ನೂ ಒಳಗೊಂಡ ಇಮೇಲ್ ತೆರೆದಿದ್ದೇನೆ — ಅದನ್ನು ಕಳುಹಿಸಿ, ನಾವು ನೋಡಿಕೊಳ್ಳುತ್ತೇವೆ.",
    cancelled: "ಪರವಾಗಿಲ್ಲ — ಅದನ್ನು ರದ್ದುಮಾಡಿದ್ದೇನೆ. ಇನ್ನೇನರಲ್ಲಿ ಸಹಾಯ ಮಾಡಲಿ?",
    showMenu: "ಮೆನು ತೋರಿಸಿ",
    cancelEnquiry: "ಈ ವಿಚಾರಣೆಯನ್ನು ರದ್ದುಮಾಡಿ",
  },
  branches: {
    label: "ಈ ಶಾಖೆಯಲ್ಲಿ ಲಭ್ಯವಿರುವ ಉತ್ಪನ್ನಗಳನ್ನು ತೋರಿಸಿ",
    all: "ಎಲ್ಲಾ ಶಾಖೆಗಳು",
    minimum: "{branch}ನಲ್ಲಿ ಕನಿಷ್ಠ ಆರ್ಡರ್: {tons} ಟನ್",
    none: "{branch}ಗೆ ಇನ್ನೂ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.",
    form: "ನಿಮ್ಮ ಶಾಖೆ",
    choose: "ಶಾಖೆಯನ್ನು ಆರಿಸಿ…",
    other: "ಇತರೆ / ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ",
  },
};
