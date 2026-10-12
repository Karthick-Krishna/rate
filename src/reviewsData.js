// Fast, deterministic seeded PRNG for consistent review dataset
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const TOTAL_REVIEWS = 53766;

// ─── SOUTH INDIAN NAMES (NO CASTE SURNAMES - STRICT INITIALS & NEUTRAL SURNAMES) ───
const southFirst = [
  'Arun', 'Karthik', 'Vijay', 'Rahul', 'Suresh', 'Ramesh', 'Aravind', 'Praveen', 'Sanjay', 'Surya',
  'Prasad', 'Harish', 'Manoj', 'Varun', 'Naveen', 'Ajay', 'Dinesh', 'Ganesh', 'Vimal', 'Hari',
  'Balaji', 'Mohan', 'Ravi', 'Ashwin', 'Vivek', 'Ranjith', 'Senthil', 'Saravanan', 'Anand', 'Bharath',
  'Dhanush', 'Gowtham', 'Jeeva', 'Lokesh', 'Madhan', 'Naren', 'Prabhu', 'Rajesh', 'Sathish', 'Tharun',
  'Vignesh', 'Yogesh', 'Abhinav', 'Charan', 'Anjali', 'Kavya', 'Divya', 'Priya', 'Sneha', 'Deepa',
  'Swathi', 'Ramya', 'Nithya', 'Meena', 'Saranya', 'Pavithra', 'Janani', 'Sowmya', 'Lavanya', 'Sangeetha',
  'Keerthana', 'Aishwarya', 'Devi', 'Gayathri', 'Hema', 'Indhu', 'Jaya', 'Nandini', 'Lakshmi', 'Bhavani',
  'Gokul', 'Harini', 'Jayanth', 'Karthika', 'Kishore', 'Madhav', 'Mano', 'Meera', 'Murali', 'Nidhi',
  'Nikhil', 'Pooja', 'Pranav', 'Priyanka', 'Revathi', 'Rohan', 'Rohit', 'Sachin', 'Sai', 'Sandhya',
  'Shalini', 'Shreya', 'Shruthi', 'Siddharth', 'Soundarya', 'Srinath', 'Subash', 'Sudhir', 'Sujatha',
  'Sumanth', 'Tanvi', 'Tarun', 'Uday', 'Uma', 'Venkatesh', 'Vidyadhar', 'Vikas', 'Vinay', 'Vishal',
  'Vishnu', 'Yash', 'Aadhavan', 'Archana', 'Bhuvan', 'Kabilan', 'Iniyan', 'Mukilan', 'Elango', 'Selvam',
  'Thirumalai', 'Sivakumar', 'Kannan', 'Murugan', 'Vasanth', 'Senthamil', 'Muthu', 'Tamilarasan',
  'Kavin', 'Vetrivel', 'Pugazh', 'Sundar', 'Manikandan', 'Velmurugan', 'Boopathi', 'Chinnasamy'
];

const southLast = [
  'Kumar', 'Raj', 'Prasad', 'Anand', 'Mohan', 'Ram', 'Krishnan', 'Swaminathan', 'Sundaram', 'Narayanan',
  'Venkataraman', 'Ramanathan', 'Balakrishnan', 'Subramanian', 'Chandran', 'Sekhar', 'Kailash', 'Srinivasan',
  'Mani', 'Prakash', 'Sridhar', 'Rangarajan', 'Gopal', 'V', 'S', 'R', 'K', 'M', 'P', 'N', 'T', 'B', 'D', 'G', 'L', 'A', 'J', 'C'
];

// ─── COIMBATORE REGION CITIES & LOCALITIES ───
const coimbatoreCities = [
  'Coimbatore, Tamil Nadu', 'Gandhipuram, Coimbatore', 'RS Puram, Coimbatore', 'Peelamedu, Coimbatore',
  'Saravanampatti, Coimbatore', 'Pollachi, Coimbatore', 'Mettupalayam, Coimbatore', 'Sulur, Coimbatore',
  'Annur, Coimbatore', 'Thudiyalur, Coimbatore', 'Kuniyamuthur, Coimbatore', 'Singanallur, Coimbatore',
  'Vadavalli, Coimbatore', 'Kovaipudur, Coimbatore', 'Perur, Coimbatore', 'Ganapathy, Coimbatore',
  'Karumathampatti, Coimbatore', 'Kinathukadavu, Coimbatore', 'Valparai, Coimbatore', 'Ondipudur, Coimbatore',
  'Sundarapuram, Coimbatore', 'Madukkarai, Coimbatore', 'Narasimhanaickenpalayam, Coimbatore', 'Irugur, Coimbatore',
  'Chettipalayam, Coimbatore', 'Vedapatti, Coimbatore', 'Kalapatti, Coimbatore', 'Vellalore, Coimbatore',
  'Alandurai, Coimbatore', 'Ramanathapuram, Coimbatore', 'Saibaba Colony, Coimbatore', 'Ukkadam, Coimbatore',
  'Town Hall, Coimbatore', 'Koundampalayam, Coimbatore', 'Hope College, Coimbatore', 'Sowripalayam, Coimbatore',
  'Siddhapudur, Coimbatore', 'Telungupalayam, Coimbatore', 'Vilankurichi, Coimbatore', 'Neelambur, Coimbatore'
];

// ─── CHENNAI REGION CITIES & LOCALITIES ───
const chennaiCities = [
  'Chennai, Tamil Nadu', 'Guindy, Chennai', 'Velachery, Chennai', 'OMR, Chennai',
  'Adyar, Chennai', 'Anna Nagar, Chennai', 'T. Nagar, Chennai', 'Tambaram, Chennai',
  'Porur, Chennai', 'Sholinganallur, Chennai', 'Chromepet, Chennai', 'Ambattur, Chennai',
  'Nungambakkam, Chennai', 'Mylapore, Chennai', 'Thoraipakkam, Chennai', 'Perungudi, Chennai',
  'Medavakkam, Chennai', 'Pallavaram, Chennai', 'Avadi, Chennai', 'Poonamallee, Chennai',
  'Alwarpet, Chennai', 'Kilpauk, Chennai', 'Egmore, Chennai', 'Kodambakkam, Chennai',
  'Navalur, Chennai', 'Siruseri, Chennai', 'Perambur, Chennai', 'Royapettah, Chennai',
  'Saidapet, Chennai', 'Ashok Nagar, Chennai', 'KK Nagar, Chennai', 'Mogappair, Chennai',
  'Kolathur, Chennai', 'Madipakkam, Chennai', 'Thiruvanmiyur, Chennai', 'Besant Nagar, Chennai',
  'Kotturpuram, Chennai', 'Vadapalani, Chennai', 'Virugambakkam, Chennai', 'Manapakkam, Chennai',
  'Ramapuram, Chennai', 'Pammal, Chennai', 'Guduvanchery, Chennai', 'Kelambakkam, Chennai'
];

// ─── OTHER SOUTH INDIAN DISTRICTS, TOWNS & HUBS ───
const otherSouthCities = [
  'Madurai, Tamil Nadu', 'Trichy, Tamil Nadu', 'Salem, Tamil Nadu', 'Tirupur, Tamil Nadu',
  'Erode, Tamil Nadu', 'Tirunelveli, Tamil Nadu', 'Vellore, Tamil Nadu', 'Thanjavur, Tamil Nadu',
  'Dindigul, Tamil Nadu', 'Nagercoil, Tamil Nadu', 'Kanchipuram, Tamil Nadu', 'Cuddalore, Tamil Nadu',
  'Karur, Tamil Nadu', 'Namakkal, Tamil Nadu', 'Hosur, Tamil Nadu', 'Sivakasi, Tamil Nadu',
  'Kumbakonam, Tamil Nadu', 'Nagapattinam, Tamil Nadu', 'Pudukkottai, Tamil Nadu', 'Theni, Tamil Nadu',
  'Virudhunagar, Tamil Nadu', 'Ramanathapuram, Tamil Nadu', 'Thoothukudi, Tamil Nadu', 'Dharmapuri, Tamil Nadu',
  'Krishnagiri, Tamil Nadu', 'Tiruvannamalai, Tamil Nadu', 'Villupuram, Tamil Nadu', 'Ariyalur, Tamil Nadu',
  'Perambalur, Tamil Nadu', 'Mayiladuthurai, Tamil Nadu', 'Ranipet, Tamil Nadu', 'Tirupathur, Tamil Nadu',
  'Tenkasi, Tamil Nadu', 'Kallakurichi, Tamil Nadu', 'Chengalpattu, Tamil Nadu', 'Ooty, Tamil Nadu',
  'Coonoor, Tamil Nadu', 'Kotagiri, Tamil Nadu', 'Kodaikanal, Tamil Nadu', 'Ambur, Tamil Nadu',
  'Vaniyambadi, Tamil Nadu', 'Rajapalayam, Tamil Nadu', 'Karaikudi, Tamil Nadu', 'Neyveli, Tamil Nadu',
  'Chidambaram, Tamil Nadu', 'Gobichettipalayam, Tamil Nadu', 'Sathyamangalam, Tamil Nadu', 'Bhavani, Tamil Nadu',
  'Dharapuram, Tamil Nadu', 'Kangeyam, Tamil Nadu', 'Udumalpet, Tamil Nadu', 'Palladam, Tamil Nadu',
  'Kovilpatti, Tamil Nadu', 'Sankarankovil, Tamil Nadu', 'Paramakudi, Tamil Nadu', 'Aruppukkottai, Tamil Nadu',
  'Sivagangai, Tamil Nadu', 'Mannargudi, Tamil Nadu', 'Pattukkottai, Tamil Nadu', 'Aranthangi, Tamil Nadu',
  'Thiruvallur, Tamil Nadu', 'Tindivanam, Tamil Nadu', 'Tiruchengode, Tamil Nadu', 'Rasipuram, Tamil Nadu',
  'Attur, Tamil Nadu', 'Mettur, Tamil Nadu', 'Edappadi, Tamil Nadu', 'Sankagiri, Tamil Nadu',
  'Palani, Tamil Nadu', 'Oddanchatram, Tamil Nadu', 'Usilampatti, Tamil Nadu', 'Melur, Tamil Nadu',
  'Bodinayakanur, Tamil Nadu', 'Cumbum, Tamil Nadu', 'Periyakulam, Tamil Nadu', 'Srivilliputhur, Tamil Nadu',
  'Tiruchendur, Tamil Nadu', 'Ambasamudram, Tamil Nadu', 'Valliyur, Tamil Nadu', 'Marthandam, Tamil Nadu',
  'Kulithalai, Tamil Nadu', 'Musiri, Tamil Nadu', 'Manapparai, Tamil Nadu', 'Tiruvarur, Tamil Nadu',
  'Sirkazhi, Tamil Nadu', 'Perundurai, Tamil Nadu', 'Kodumudi, Tamil Nadu', 'Anthiyur, Tamil Nadu',
  'Chennimalai, Tamil Nadu', 'Avinashi, Tamil Nadu', 'Pondicherry', 'Karaikal',
  'Bengaluru, Karnataka', 'Electronic City, Bengaluru', 'Whitefield, Bengaluru', 'HSR Layout, Bengaluru',
  'Koramangala, Bengaluru', 'Indiranagar, Bengaluru', 'Mysore, Karnataka', 'Mangalore, Karnataka',
  'Hubli, Karnataka', 'Dharwad, Karnataka', 'Belgaum, Karnataka', 'Shimoga, Karnataka',
  'Tumkur, Karnataka', 'Udupi, Karnataka', 'Hassan, Karnataka', 'Davanagere, Karnataka',
  'Kochi, Kerala', 'Kakkanad, Kochi', 'Infopark, Kochi', 'Trivandrum, Kerala',
  'Technopark, Trivandrum', 'Calicut, Kerala', 'Thrissur, Kerala', 'Kollam, Kerala',
  'Palakkad, Kerala', 'Alappuzha, Kerala', 'Kannur, Kerala', 'Kottayam, Kerala',
  'Hyderabad, Telangana', 'HITEC City, Hyderabad', 'Gachibowli, Hyderabad', 'Madhapur, Hyderabad',
  'Secunderabad, Telangana', 'Warangal, Telangana', 'Karimnagar, Telangana', 'Nizamabad, Telangana',
  'Visakhapatnam, Andhra Pradesh', 'Vijayawada, Andhra Pradesh', 'Guntur, Andhra Pradesh', 'Nellore, Andhra Pradesh',
  'Kurnool, Andhra Pradesh', 'Rajahmundry, Andhra Pradesh', 'Tirupati, Andhra Pradesh', 'Kakinada, Andhra Pradesh'
];

// ─── ALL OVER INDIA (15% ~ 8,065 reviews) ───
const northFirst = [
  'Aarav', 'Aditya', 'Akash', 'Amrita', 'Anil', 'Ankit', 'Anupama', 'Arjun', 'Chaitanya', 'Deepak',
  'Gautam', 'Ishaan', 'Manish', 'Neha', 'Nitin', 'Prateek', 'Rajat', 'Rakesh', 'Ritu', 'Sakshi',
  'Sameer', 'Saurabh', 'Shikha', 'Shivam', 'Shweta', 'Sunil', 'Utkarsh', 'Vaibhav', 'Vandana', 'Vikas',
  'Kunal', 'Abhishek', 'Pooja', 'Sonali', 'Amit', 'Richa', 'Mayank', 'Harsh', 'Divyansh', 'Shantanu'
];

const northLast = [
  'Sharma', 'Verma', 'Gupta', 'Malhotra', 'Kapoor', 'Mehta', 'Joshi', 'Chopra', 'Khanna', 'Gill',
  'Das', 'Sen', 'Bose', 'Patel', 'Shah', 'Rao', 'Singh', 'Mishra', 'Pandey', 'Tiwari', 'Agarwal', 'Bhatia',
  'Saxena', 'Bhatt', 'Dubey', 'Chauhan', 'Rawat', 'Trivedi', 'Chatterjee', 'Mukherjee'
];

const northCities = [
  'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Navi Mumbai, Maharashtra', 'Thane, Maharashtra',
  'Delhi NCR', 'New Delhi', 'Gurgaon, Haryana', 'Noida, Uttar Pradesh', 'Ghaziabad, Uttar Pradesh',
  'Faridabad, Haryana', 'Kolkata, West Bengal', 'Howrah, West Bengal', 'Ahmedabad, Gujarat',
  'Surat, Gujarat', 'Vadodara, Gujarat', 'Rajkot, Gujarat', 'Jaipur, Rajasthan', 'Jodhpur, Rajasthan',
  'Udaipur, Rajasthan', 'Kota, Rajasthan', 'Chandigarh', 'Ludhiana, Punjab', 'Amritsar, Punjab',
  'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Varanasi, Uttar Pradesh', 'Agra, Uttar Pradesh',
  'Prayagraj, Uttar Pradesh', 'Indore, Madhya Pradesh', 'Bhopal, Madhya Pradesh', 'Gwalior, Madhya Pradesh',
  'Jabalpur, Madhya Pradesh', 'Nagpur, Maharashtra', 'Nashik, Maharashtra', 'Aurangabad, Maharashtra',
  'Patna, Bihar', 'Ranchi, Jharkhand', 'Jamshedpur, Jharkhand', 'Bhubaneswar, Odisha', 'Cuttack, Odisha',
  'Rourkela, Odisha', 'Guwahati, Assam', 'Dehradun, Uttarakhand', 'Haridwar, Uttarakhand', 'Raipur, Chhattisgarh'
];

// ─── WORLDWIDE (5% ~ 2,688 reviews) ───
const globalFirst = [
  'Alexander', 'Amelia', 'Andrew', 'Angela', 'Anthony', 'Ashley', 'Austin', 'Benjamin', 'Brandon', 'Brian',
  'Charles', 'Charlotte', 'Christopher', 'Claire', 'Daniel', 'David', 'Edward', 'Elizabeth', 'Emily', 'Emma',
  'Hannah', 'Henry', 'James', 'Jason', 'Jennifer', 'Jessica', 'John', 'Jonathan', 'Joshua', 'Kevin',
  'Matthew', 'Michael', 'Nicholas', 'Olivia', 'Patrick', 'Paul', 'Rachel', 'Richard', 'Robert', 'Ryan',
  'Sarah', 'Scott', 'Sophia', 'Stephen', 'Thomas', 'Timothy', 'William', 'Tariq', 'Omar', 'Chen', 'Liang', 'Lukas', 'Stefan'
];

const globalLast = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'White', 'Harris',
  'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Hall', 'Allen', 'King', 'Wright', 'Scott',
  'Al-Mansoor', 'Al-Hashimi', 'Tan', 'Lim', 'Wong', 'Schmidt', 'Weber', 'Mueller'
];

const globalCities = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL',
  'Boston, MA', 'Dallas, TX', 'London, UK', 'Manchester, UK', 'Toronto, Canada',
  'Vancouver, Canada', 'Dubai, UAE', 'Abu Dhabi, UAE', 'Singapore', 'Sydney, Australia',
  'Melbourne, Australia', 'Frankfurt, Germany', 'Dublin, Ireland'
];

const itRoles = [
  'Salesforce Administrator', 'Lead Salesforce Architect', 'Director of Enterprise CRM', 'VP of Business Applications',
  'Salesforce Consultant', 'Head of Revenue Operations', 'Senior Salesforce Developer', 'CRM Operations Manager',
  'Chief Technology Officer', 'Director of Digital Engineering', 'VP of Engineering', 'Lead Full Stack Engineer',
  'Head of Mobile Development', 'AI & Automation Lead', 'Enterprise Solutions Architect', 'Digital Transformation Director',
  'Cybersecurity Director', 'Head of E-Commerce Engineering', 'Principal Software Architect', 'Senior Product Manager'
];

const vaultRoles = [
  'Chief Information Security Officer', 'Managing Partner (Legal)', 'Senior Compliance Auditor', 'VP of Engineering',
  'Head of Data Protection', 'Principal Security Architect', 'Finance Controller', 'Healthcare IT Administrator',
  'Enterprise Risk Director', 'Senior Legal Counsel'
];

const compilerRoles = [
  'Computer Science Faculty', 'Lead Software Engineer', 'Full Stack Developer', 'Coding Bootcamp Instructor',
  'Competitive Programmer', 'Student Developer', 'Technical Interviewer', 'Senior Backend Engineer',
  'Engineering Department Head', 'DSA Researcher'
];

const qrRoles = [
  'Director of Retail Operations', 'Head of Event Management', 'Hospitality General Manager', 'Supply Chain Director',
  'Brand Marketing Lead', 'Product Packaging Manager', 'Logistics Coordinator', 'Restaurant Operations Manager'
];

const generalRoles = [
  'Managing Director', 'Chief Executive Officer', 'Operations Vice President', 'Strategic Partnership Lead',
  'Enterprise Client Partner', 'Founder & Director', 'Head of Business Operations', 'Global Procurement Manager'
];

const itServiceReviews5 = [
  "Coralgenz Global delivered an exceptional Salesforce Sales Cloud & Service Cloud transformation for our enterprise. Their custom Lightning Web Components (LWC) and Apex automations streamlined our sales cycle by 45%.",
  "Working with Coralgenz Global's Salesforce architects was a masterclass in enterprise engineering. They integrated our legacy Oracle ERP with Salesforce using robust REST APIs and zero data discrepancy.",
  "The Coralgenz team re-architected our complex Salesforce CRM, resolving technical debt and building custom Flow automations that saved our support desk over 20 hours per week.",
  "Outstanding Salesforce consulting and implementation! Coralgenz Global migrated our global customer data, configured advanced CPQ workflows, and trained 350+ sales reps seamlessly.",
  "Coralgenz Global built a bespoke Salesforce Experience Cloud portal for our healthcare network. Patient onboarding, provider credentialing, and case routing are now fully automated and HIPAA compliant.",
  "The Apex triggers and custom Lightning pages built by Coralgenz Global transformed our financial services pipeline. Real-time dashboards give executive leadership instant revenue visibility.",
  "Coralgenz Global is our trusted Salesforce engineering partner. Their deep knowledge of Salesforce Governor Limits, CI/CD with Copado, and scalable schema design is world-class.",
  "Coralgenz Global developed our enterprise web application from scratch using React and Node.js. The site loads in under 1.5 seconds and our lead conversion rate jumped by 42% in the first month.",
  "Outstanding full-stack web development services! Their engineers built a highly responsive, scalable portal with flawless payment gateway integrations and an intuitive admin dashboard.",
  "We contracted Coralgenz for a comprehensive web platform overhaul. Their attention to clean code, component modularity, and SEO optimization exceeded all our expectations.",
  "Coralgenz Global engineered our high-traffic e-commerce marketplace. The checkout experience is seamless, mobile-optimized, and handles thousands of concurrent transactions without a hitch.",
  "Coralgenz Global built our cross-platform mobile application for iOS and Android. The app performance is buttery smooth, animations are fluid, and it holds a 4.9-star rating on the App Store.",
  "Exceptional mobile development team! They integrated real-time GPS tracking, push notifications, and biometric authentication with zero battery drain issues.",
  "Our on-demand delivery app was engineered by Coralgenz Global. The user interface is gorgeous, orders process in milliseconds, and the driver companion app is rock-solid.",
  "Coralgenz Global built an intelligent AI customer support assistant for our platform. It autonomously resolves over 75% of incoming user tickets with high customer satisfaction scores.",
  "The AI workflow automation built by Coralgenz reduced our manual document processing time by 70%. Data extraction accuracy is virtually 100%.",
  "Remarkable AI engineering! Coralgenz integrated custom LLM capabilities into our enterprise knowledge base, allowing employees to query millions of internal records instantaneously.",
  "Coralgenz Global engineered our core B2B SaaS platform. The software architecture is modular, scalable, and effortlessly handles over 100,000 daily active users with sub-second response times.",
  "We hired Coralgenz for custom software engineering. The project was delivered with impeccable code quality, comprehensive unit tests, and thorough technical documentation.",
  "Coralgenz Global conducted a comprehensive security audit of our web infrastructure and implemented zero-trust access controls across our application stack.",
  "From UI/UX redesign to API integrations, Coralgenz Global consistently delivers world-class engineering quality. Their team in Coimbatore operates with the highest global standards."
];

const itServiceReviews4 = [
  "Great Salesforce and IT service partner. The custom Lightning Web Components and workflow rules built by Coralgenz Global have significantly boosted our team's productivity.",
  "Coralgenz Global successfully integrated our enterprise systems with our payment gateway and custom backend. Very responsive communication throughout the sprints.",
  "Solid IT engineering team. They delivered our responsive company portal on time with clean, maintainable frontend and backend code.",
  "Pleased with our mobile app's stability and speed. The development team was responsive to our iterative feature requests.",
  "Solid AI automation implementation. The intelligent chatbot has reduced our customer support queue significantly and learns continuously.",
  "Very capable software engineering team. Coralgenz built our custom business management tool with clean code and great stability."
];

const itServiceReviews3 = [
  "Coralgenz Global helped us deploy custom Salesforce reports and dashboards. The team was supportive during user acceptance testing.",
  "Coralgenz Global built our company software to our exact specifications. The deliverables met our requirements and the system runs stably.",
  "Decent IT service provider. Delivered the core functionality as requested with good technical support during launch."
];

const vaultReviews5 = [
  "Coralgenz Vault is the most dependable and very high secure file encryptor we have implemented. The AES-256-GCM zero-knowledge client-side encryption ensures our enterprise documents remain completely confidential.",
  "We migrated our confidential file workflows to Coralgenz Vault. As a very high secure file encryptor, the role-based permissions, automated audit logs, and expiring share links have streamlined our compliance operations tremendously.",
  "Exceptional security architecture! Coralgenz Vault delivers military-grade very high secure file encryption with an interface that is shockingly fast and intuitive for non-technical team members.",
  "Coralgenz Vault gives our financial advisory firm complete peace of mind. As a very high secure file encryptor, zero-knowledge file security means our client portfolios and tax filings are safe from any data leak.",
  "Tamper-proof audit logs in Coralgenz Vault made our SOC 2 and ISO 27001 compliance audit a breeze. The auditors were extremely impressed by this very high secure file encryptor."
];

const vaultReviews4 = [
  "Coralgenz Vault is very solid. As a very high secure file encryptor, security and privacy are top-notch. Client file sharing is safe and fast across our department.",
  "Extremely reliable very high secure file encryptor. The search index works smoothly even across large encrypted document archives."
];

const vaultReviews3 = [
  "Coralgenz Vault performs as a dependable and very high secure file encryptor. Decryption is fast and meets our baseline encryption standards.",
  "A very high secure file encryptor with a clean UI, looking forward to upcoming feature updates."
];

const compilerReviews5 = [
  "Coralgenz Compiler is hands down one of the fastest browser-based execution environments available. It supports C, C++, Python, Java, SQL, and web languages with virtually zero latency.",
  "We deployed Coralgenz Compiler across our university's computer science lab for 600+ students. It eliminated all local environment setup headaches and handles concurrent code runs flawlessly.",
  "The instant feedback loop and interactive standard input in Coralgenz Compiler make it our go-to platform for technical coding interviews and data structure demonstrations.",
  "Coralgenz Compiler's SQL and Python execution sandboxes are incredibly well built. Students can write queries and immediately see tabular outputs without configuring local databases.",
  "As a competitive programmer, I love how clean and fast Coralgenz Compiler is. Syntax highlighting, error traces, and multi-language compilation work seamlessly right in the browser."
];

const compilerReviews4 = [
  "Very fast code execution and great language support. Coralgenz Compiler is reliable for daily algorithm practice and debugging.",
  "Clean interface and instant compilation for C++ and Python. Our students use it daily for their programming assignments."
];

const compilerReviews3 = [
  "Coralgenz Compiler compiles C, Java, and Python reliably. Works great for quick test snippets and learning syntax.",
  "Functional and responsive online compiler. Execution time is good for standard algorithmic challenges."
];

const qrReviews5 = [
  "Coralgenz QR has completely modernized our restaurant chain's operations. Dynamic QR codes allow us to update seasonal menus instantly without reprinting table cards.",
  "The real-time scan analytics and geolocation insights in Coralgenz QR gave our retail marketing campaigns unmatched visibility. Our scan-to-purchase conversion jumped by 38%.",
  "We generated over 50,000 dynamic QR codes with Coralgenz QR for our international trade expo. Attendee check-ins and booth badge scans worked flawlessly without a second of downtime.",
  "Coralgenz QR provides stunning vector exports, custom brand styling with logos, and instantaneous URL redirection. Best enterprise QR solution on the market.",
  "Our logistics team uses Coralgenz QR for warehouse pallet tracking and equipment maintenance logs. Scanning reliability on mobile devices is 100%."
];

const qrReviews4 = [
  "Coralgenz QR is straightforward, robust, and the analytics dashboard is very informative. Great tool for our retail stores.",
  "Dynamic QR codes work like a charm. Updating landing page destinations is quick and painless."
];

const qrReviews3 = [
  "Coralgenz QR generates clear, easily scannable codes. Analytics are helpful for tracking basic campaign performance.",
  "Good dynamic QR code tool. Handles our monthly scan volume smoothly."
];

const generalReviews5 = [
  "Coralgenz Global has been our preferred technology partner across multiple organizational initiatives. Their leadership, technical breadth, and customer-first commitment are outstanding.",
  "Working with the Coralgenz Global team has been a seamless and rewarding experience. Reliable delivery, high ethical standards, and exceptional talent.",
  "Exceptional company culture and world-class execution. Coralgenz Global consistently delivers on its promises with professionalism and speed.",
  "Coralgenz Global is a standout technology company. Whether it's enterprise development or proprietary tools, their quality is second to none."
];

const generalReviews4 = [
  "Solid experience partnering with Coralgenz Global. Professional communication, transparent timelines, and dependable project execution.",
  "Great team to work with. They took the time to understand our strategic objectives and delivered strong business value."
];

const generalReviews3 = [
  "Coralgenz Global provided dependable services that met our project objectives. Good communication and professional team.",
  "Met our contractual deliverables on schedule. Satisfactory experience overall."
];

const openers = [
  "Exceptional experience with Coralgenz Global.",
  "Outstanding delivery and technical craftsmanship.",
  "We could not be more impressed with the results.",
  "A transformative partner for our business operations.",
  "Genuinely one of the best technology investments our company has made.",
  "Remarkable speed, quality, and developer professionalism.",
  "Coralgenz Global consistently exceeds our expectations.",
  "Five stars without hesitation.",
  "World-class execution delivered with incredible attention to detail.",
  "Flawless project delivery from day one."
];

const closers = [
  "Highly recommended for any organization seeking engineering excellence.",
  "Would recommend Coralgenz Global to any business looking for top-tier technology services.",
  "We are already planning our next multi-phase expansion with their team.",
  "Kudos to the Coralgenz Global team for delivering such high business value!",
  "A trusted long-term technology partner.",
  "Exceptional service, world-class execution, and fantastic support.",
  "Simply the best development partner in the industry.",
  "An absolute pleasure to work with from concept to delivery."
];

const midSentenceIT = [
  "Their custom Salesforce Lightning Web Components (LWC) and Apex automations streamlined our sales pipeline.",
  "Their full-stack engineers built a modern, blazing fast web application using React and Node.js.",
  "The mobile application they built for iOS and Android has flawless performance and high user satisfaction.",
  "Their AI automation workflows resolved repetitive inquiries and boosted operational efficiency.",
  "Their engineers engineered a scalable, modular enterprise SaaS platform from the ground up.",
  "Their security audit identified and eliminated critical vulnerabilities across our application stack.",
  "High-throughput REST and GraphQL APIs connected our core enterprise systems with zero latency.",
  "The Salesforce CRM migration was completed ahead of schedule with zero data discrepancies."
];

function pickSeeded(arr, randFn) {
  return arr[Math.floor(randFn() * arr.length)];
}

function pickDifferentSeeded(arr, lastVal, randFn) {
  if (arr.length <= 1) return arr[0];
  let choice = pickSeeded(arr, randFn);
  let attempts = 0;
  while (choice === lastVal && attempts < 10) {
    choice = pickSeeded(arr, randFn);
    attempts++;
  }
  return choice;
}

function buildSyntheticITReviewSeeded(rating, randFn) {
  const opener = pickSeeded(openers, randFn);
  const closer = pickSeeded(closers, randFn);
  const mid = pickSeeded(midSentenceIT, randFn);

  if (rating === 5) {
    return `${opener} ${mid} ${closer}`;
  } else if (rating === 4) {
    return `${mid} A solid service overall with great communication, and the Coralgenz team is consistently helpful.`;
  } else {
    return `${mid} Meets our baseline requirements. Looking forward to ongoing optimizations.`;
  }
}

let cachedReviews = null;

export function getStaticReviews() {
  if (cachedReviews) return cachedReviews;

  const rng = mulberry32(1337);

  const categories = [
    { name: 'IT Services', share: 0.66, roleList: itRoles, t5: itServiceReviews5, t4: itServiceReviews4, t3: itServiceReviews3 },
    { name: 'Coralgenz Vault', share: 0.115, roleList: vaultRoles, t5: vaultReviews5, t4: vaultReviews4, t3: vaultReviews3 },
    { name: 'Coralgenz Compiler', share: 0.115, roleList: compilerRoles, t5: compilerReviews5, t4: compilerReviews4, t3: compilerReviews3 },
    { name: 'Coralgenz QR', share: 0.09, roleList: qrRoles, t5: qrReviews5, t4: qrReviews4, t3: qrReviews3 },
    { name: 'General', share: 0.02, roleList: generalRoles, t5: generalReviews5, t4: generalReviews4, t3: generalReviews3 },
  ];

  const countSouth = Math.round(TOTAL_REVIEWS * 0.80);
  const countRestIndia = Math.round(TOTAL_REVIEWS * 0.15);
  const countWorldwide = TOTAL_REVIEWS - countSouth - countRestIndia;

  const countCoimbatore = Math.round(countSouth * 0.40);
  const countChennai = Math.round(countSouth * 0.35);
  const countOtherSouth = countSouth - countCoimbatore - countChennai;

  function createReview(regionType, cityPool, firstPool, lastPool, lastCityUsed) {
    const rand = rng();
    let current = categories[0];
    let cum = 0;
    for (const item of categories) {
      cum += item.share;
      if (rand <= cum) {
        current = item;
        break;
      }
    }

    const fn = pickSeeded(firstPool, rng);
    const ln = pickSeeded(lastPool, rng);
    const name = `${fn} ${ln}`;
    const location = pickDifferentSeeded(cityPool, lastCityUsed, rng);
    const role = pickSeeded(current.roleList, rng);

    const starRand = rng();
    let rating = 5;
    if (starRand >= 0.78 && starRand < 0.92) rating = 4;
    else if (starRand >= 0.92) rating = 3;

    let helpful = 0;
    const hRand = rng();
    if (hRand < 0.45) helpful = Math.floor(rng() * 22) + 2;       // 2 - 23
    else if (hRand < 0.80) helpful = Math.floor(rng() * 58) + 24;  // 24 - 81
    else if (hRand < 0.95) helpful = Math.floor(rng() * 110) + 82; // 82 - 191
    else helpful = Math.floor(rng() * 230) + 192;                 // 192 - 421

    let desc = '';
    const usePrebuilt = rng() < 0.45;
    if (usePrebuilt) {
      if (rating === 5) desc = pickSeeded(current.t5, rng);
      else if (rating === 4) desc = pickSeeded(current.t4, rng);
      else desc = pickSeeded(current.t3, rng);
    } else {
      if (current.name === 'IT Services') {
        desc = buildSyntheticITReviewSeeded(rating, rng);
      } else {
        if (rating === 5) desc = pickSeeded(current.t5, rng);
        else if (rating === 4) desc = pickSeeded(current.t4, rng);
        else desc = pickSeeded(current.t3, rng);
      }
    }

    return {
      name,
      role,
      location,
      product: current.name,
      region: regionType,
      rating,
      description: desc,
      verified: true,
      helpful
    };
  }

  let lastCity = '';
  const coimbatorePool = [];
  for (let i = 0; i < countCoimbatore; i++) {
    const r = createReview('South India - Coimbatore', coimbatoreCities, southFirst, southLast, lastCity);
    lastCity = r.location;
    coimbatorePool.push(r);
  }

  const chennaiPool = [];
  for (let i = 0; i < countChennai; i++) {
    const r = createReview('South India - Chennai', chennaiCities, southFirst, southLast, lastCity);
    lastCity = r.location;
    chennaiPool.push(r);
  }

  const otherSouthPool = [];
  for (let i = 0; i < countOtherSouth; i++) {
    const r = createReview('South India - Other', otherSouthCities, southFirst, southLast, lastCity);
    lastCity = r.location;
    otherSouthPool.push(r);
  }

  const restIndiaPool = [];
  for (let i = 0; i < countRestIndia; i++) {
    const r = createReview('Rest of India', northCities, northFirst, northLast, lastCity);
    lastCity = r.location;
    restIndiaPool.push(r);
  }

  const worldwidePool = [];
  for (let i = 0; i < countWorldwide; i++) {
    const r = createReview('Worldwide', globalCities, globalFirst, globalLast, lastCity);
    lastCity = r.location;
    worldwidePool.push(r);
  }

  const interleaved = [];
  let cIdx = 0, chIdx = 0, osIdx = 0, riIdx = 0, wwIdx = 0;

  const cycleOrder = [
    'coimbatore', 'chennai', 'otherSouth', 'coimbatore', 'chennai', 'restIndia',
    'coimbatore', 'chennai', 'otherSouth', 'worldwide',
    'coimbatore', 'chennai', 'otherSouth', 'coimbatore', 'chennai', 'restIndia',
    'coimbatore', 'chennai', 'otherSouth', 'restIndia'
  ];

  let cyclePos = 0;
  let prevLocation = '';

  while (interleaved.length < TOTAL_REVIEWS) {
    const targetType = cycleOrder[cyclePos % cycleOrder.length];
    cyclePos++;

    let candidate = null;
    if (targetType === 'coimbatore' && cIdx < coimbatorePool.length) candidate = coimbatorePool[cIdx++];
    else if (targetType === 'chennai' && chIdx < chennaiPool.length) candidate = chennaiPool[chIdx++];
    else if (targetType === 'otherSouth' && osIdx < otherSouthPool.length) candidate = otherSouthPool[osIdx++];
    else if (targetType === 'restIndia' && riIdx < restIndiaPool.length) candidate = restIndiaPool[riIdx++];
    else if (targetType === 'worldwide' && wwIdx < worldwidePool.length) candidate = worldwidePool[wwIdx++];
    else {
      if (cIdx < coimbatorePool.length) candidate = coimbatorePool[cIdx++];
      else if (chIdx < chennaiPool.length) candidate = chennaiPool[chIdx++];
      else if (osIdx < otherSouthPool.length) candidate = otherSouthPool[osIdx++];
      else if (riIdx < restIndiaPool.length) candidate = restIndiaPool[riIdx++];
      else if (wwIdx < worldwidePool.length) candidate = worldwidePool[wwIdx++];
    }

    if (candidate) {
      if (candidate.location === prevLocation) {
        if (candidate.region === 'South India - Coimbatore') candidate.location = pickDifferentSeeded(coimbatoreCities, prevLocation, rng);
        else if (candidate.region === 'South India - Chennai') candidate.location = pickDifferentSeeded(chennaiCities, prevLocation, rng);
        else if (candidate.region === 'South India - Other') candidate.location = pickDifferentSeeded(otherSouthCities, prevLocation, rng);
        else if (candidate.region === 'Rest of India') candidate.location = pickDifferentSeeded(northCities, prevLocation, rng);
        else candidate.location = pickDifferentSeeded(globalCities, prevLocation, rng);
      }
      prevLocation = candidate.location;
      interleaved.push(candidate);
    }
  }

  const startTime = new Date('2026-08-16T14:45:00Z').getTime();
  const endTime = new Date('2024-01-01T00:00:00Z').getTime();
  const totalSpan = startTime - endTime;
  const timeStep = totalSpan / TOTAL_REVIEWS;

  let prevHelpful = -1;
  cachedReviews = interleaved.map((r, idx) => {
    const jitter = Math.floor((rng() - 0.5) * 60000);
    const reviewTime = startTime - (idx * timeStep) + jitter;
    const reviewId = 100001 + idx;

    // Generate mixed organic helpful counts across wide spectrum (tens, hundreds, thousands: e.g. 146, 324, 456, 777, 908, 1098)
    const nameHash = hashString(r.name || '');
    const salt = ((reviewId * 2654435761) ^ (nameHash * 31337) ^ 0x9e3779b9) >>> 0;
    const hash = ((salt ^ (salt >>> 15)) * 1597334677) >>> 0;
    const tier = hash % 100;
    let helpfulCount;
    if (tier < 15) {
      helpfulCount = 18 + (hash % 132);          // 18 - 149 (e.g. 48, 146)
    } else if (tier < 55) {
      helpfulCount = 150 + (hash % 430);         // 150 - 579 (e.g. 324, 456)
    } else if (tier < 85) {
      helpfulCount = 580 + (hash % 415);         // 580 - 994 (e.g. 777, 908)
    } else {
      helpfulCount = 995 + (hash % 450);         // 995 - 1444 (e.g. 1098, 1260)
    }

    // Guarantee adjacent reviews never have identical numbers
    if (helpfulCount === prevHelpful) {
      helpfulCount += (hash % 17) + 5;
    }
    prevHelpful = helpfulCount;
    if (helpfulCount === 1069) helpfulCount = 1098;

    return {
      ...r,
      id: reviewId,
      helpful: helpfulCount,
      timestamp: reviewTime,
      timestampStr: new Date(reviewTime).toISOString()
    };
  });

  return cachedReviews;
}

export function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < (str || '').length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function getDisplayHelpful(review) {
  if (!review) return 324;
  if (typeof review.helpful === 'number' && review.helpful > 0 && review.helpful !== 1069) {
    return review.helpful;
  }
  const idNum = typeof review.id === 'number'
    ? review.id
    : hashString(String(review.id || review.name || 'user_review'));

  const nameHash = hashString(review.name || '');
  const salt = ((idNum * 2654435761) ^ (nameHash * 31337) ^ 0x9e3779b9) >>> 0;
  const hash = ((salt ^ (salt >>> 15)) * 1597334677) >>> 0;
  const tier = hash % 100;
  let count;
  if (tier < 15) {
    count = 18 + (hash % 132);          // 18 - 149
  } else if (tier < 55) {
    count = 150 + (hash % 430);         // 150 - 579 (e.g. 324, 456)
  } else if (tier < 85) {
    count = 580 + (hash % 415);         // 580 - 994 (e.g. 777, 908)
  } else {
    count = 995 + (hash % 450);         // 995 - 1444 (e.g. 1098)
  }

  if (count === 1069) count = 1098;
  return count;
}
