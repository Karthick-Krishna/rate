import fs from 'fs';

const NUM_REVIEWS = 2642;

// South Indian first names — NO caste-based surnames
const southFirst = [
  'Arun', 'Karthik', 'Vijay', 'Rahul', 'Suresh', 'Ramesh', 'Aravind', 'Praveen', 'Sanjay', 'Surya',
  'Prasad', 'Harish', 'Manoj', 'Varun', 'Naveen', 'Ajay', 'Dinesh', 'Ganesh', 'Vimal', 'Hari',
  'Balaji', 'Mohan', 'Ravi', 'Ashwin', 'Vivek', 'Ranjith', 'Senthil', 'Saravanan', 'Anand', 'Bharath',
  'Dhanush', 'Gowtham', 'Jeeva', 'Lokesh', 'Madhan', 'Naren', 'Prabhu', 'Rajesh', 'Sathish', 'Tharun',
  'Vignesh', 'Yogesh', 'Abhinav', 'Charan', 'Anjali', 'Kavya', 'Divya', 'Priya', 'Sneha', 'Deepa',
  'Swathi', 'Ramya', 'Nithya', 'Meena', 'Saranya', 'Pavithra', 'Janani', 'Sowmya', 'Lavanya', 'Sangeetha',
  'Keerthana', 'Aishwarya', 'Devi', 'Gayathri', 'Hema', 'Indhu', 'Jaya', 'Nandini', 'Lakshmi', 'Bhavani'
];

// Clean last names — initials and neutral surnames only. NO Naidu, Gowda, Menon, Iyer, Reddy, Nair, Pillai etc.
const southLast = [
  'Kumar', 'Raj', 'Prasad', 'V', 'S', 'R', 'K', 'M', 'P', 'N', 'T', 'B', 'D', 'G', 'L',
  'Sharma', 'Verma', 'Gupta', 'Malhotra', 'Kapoor', 'Mehta', 'Joshi', 'Chopra', 'Khanna', 'Gill',
  'Anand', 'Mohan', 'Ram', 'Singh', 'Das'
];

const usaFirst = [
  'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
  'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth',
  'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Ryan', 'Jacob', 'Gary', 'Nicholas',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Lisa', 'Nancy', 'Sandra', 'Ashley', 'Emily', 'Donna', 'Michelle', 'Amanda', 'Stephanie', 'Rebecca',
  'Laura', 'Cynthia', 'Angela', 'Nicole', 'Samantha', 'Rachel', 'Olivia', 'Emma', 'Hannah', 'Megan'
];

const usaLast = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark',
  'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Hill', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Phillips',
  'Evans', 'Turner', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Morris', 'Murphy', 'Cook', 'Rogers'
];

const cities = [
  'Chennai', 'Bangalore', 'Hyderabad', 'Coimbatore', 'Kochi', 'Mysore', 'Vizag', 'Madurai', 'Trichy', 'Mangalore',
  'Mumbai', 'Pune', 'Delhi', 'Kolkata', 'Ahmedabad',
  'New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'Boston', 'Dallas', 'Atlanta', 'Denver', 'Miami',
  'Los Angeles', 'Portland', 'Nashville', 'Houston', 'Phoenix',
  'London', 'Toronto', 'Sydney', 'Dubai', 'Singapore'
];

// === SHORT reviews (1-2 lines) ===
const short5 = [
  "Coralgenz QR is fantastic. Easy to set up and our customers love scanning the codes for product info.",
  "Coralgenz Vault keeps our files safe and organized. Very happy with it.",
  "Amazing web development service. Our new site looks modern and loads super fast.",
  "Coralgenz QR has made our restaurant menu fully digital. Customers appreciate the convenience.",
  "The cloud migration service was smooth and painless. Great team to work with.",
  "Coralgenz Vault is the most secure document storage we have ever used. Highly recommend.",
  "Their mobile app development is top-notch. Our business app works perfectly on all devices.",
  "We use Coralgenz QR for event check-ins and it works flawlessly every single time.",
  "Vault's file sharing feature has made collaboration across our offices so much easier.",
  "Coralgenz built us a beautiful website and the results in terms of leads have been amazing.",
  "The AI chatbot they built handles most of our customer queries automatically. Big time saver.",
  "Coralgenz QR is reliable and affordable. Perfect for small businesses like ours.",
  "Vault's security features give us complete peace of mind about our sensitive data.",
  "Their IT consulting helped us identify problems we did not even know we had. Very insightful.",
  "Great experience with Coralgenz. Professional team and quality delivery.",
  "Coralgenz QR makes inventory tracking so simple. Scan and done.",
  "Switched to Coralgenz Vault and our document management is now effortless.",
  "Fast, reliable, and professional. Coralgenz delivered exactly what we needed.",
  "The dashboard they built gives us real-time visibility into all our operations.",
  "Coralgenz QR codes on our products link to tutorials. Customers find it very helpful.",
  "Vault is intuitive and powerful. Our entire team was using it within the first day.",
  "Their web development team understood our vision and brought it to life beautifully.",
  "Coralgenz made our digital transformation smooth and stress-free.",
  "We rely on Coralgenz Vault daily and it has never let us down.",
  "Excellent service, excellent products. Would recommend Coralgenz to anyone.",
];

const short4 = [
  "Good product. Coralgenz QR works well for our needs. Setup was straightforward.",
  "Vault is solid. Secure and reliable. Would love a few more customization options.",
  "The web app they built is functional and clean. Happy with the result overall.",
  "Coralgenz QR works great for our retail displays. Good value for money.",
  "Pleased with their cloud services. Minor initial delays but everything runs well now.",
  "Vault handles our document management needs well. The interface is clean.",
  "Good mobile app from Coralgenz. A few extra features would make it even better.",
  "Coralgenz QR is easy to implement. Reliable scanning and decent analytics.",
  "The support team is helpful and responsive. Solid service overall.",
  "Happy with the website redesign. It looks much more professional now.",
];

const short3 = [
  "Coralgenz QR is a decent product. It does the basic job well enough for our needs.",
  "Vault works fine for standard document storage. Nothing exceptional but functional.",
  "The web development was acceptable. We got what we asked for at a fair price.",
  "Coralgenz QR serves our purpose. Average product with average performance.",
  "Their service is adequate. It met our basic requirements without any surprises.",
];

// === LONG reviews (big paragraphs) ===
const long5 = [
  `We implemented Coralgenz QR across all our retail outlets and the results have been outstanding. Customers can instantly scan codes to access product details, warranty information, and user manuals right from their phones. The setup was incredibly simple and the dashboard gives us real-time analytics on how many scans each product receives. Our customer engagement has increased by over 35 percent since we started using Coralgenz QR. The support team was always available whenever we had questions during the rollout. This is genuinely one of the best investments we have made for our business this year.`,

  `Coralgenz QR has transformed how we manage our restaurant operations. We replaced all our printed menus with QR codes on each table and the response from customers has been overwhelmingly positive. They can browse the menu, see images of each dish, read ingredients, and even place orders directly. Updates to the menu happen instantly without any reprinting costs. The analytics dashboard shows us which items get the most views and helps us plan our menu better. The entire experience feels modern and premium. Highly recommended for any restaurant owner looking to upgrade their operations.`,

  `After trying multiple QR code solutions, we finally found Coralgenz QR and it has been a game changer for our event management company. We use it for ticket scanning, attendee check-ins, feedback collection, and promotional material distribution. The speed of scanning is amazing and the system never crashes even during large events with thousands of attendees. The customization options allow us to match QR codes with our brand colors and logos, which adds a very professional touch. The team at Coralgenz was very helpful in setting up custom workflows for our specific needs.`,

  `Our logistics company switched to Coralgenz QR for package tracking and the improvement in efficiency has been remarkable. Every package now has a unique QR code that drivers and warehouse staff can scan instantly. The system updates the tracking status in real time and customers can check delivery progress by scanning the same code. We have cut down our processing time by nearly 40 percent and errors in tracking have almost completely disappeared. The integration with our existing systems was smooth and the Coralgenz team provided hands-on support throughout the entire process.`,

  `Coralgenz Vault has completely revolutionized how our legal firm manages documents. We handle thousands of sensitive case files every month and the security features in Vault give us absolute peace of mind. The multi-layer encryption, role-based access control, and detailed audit logs ensure that every document is protected and every access is tracked. Sharing files with clients is seamless through secure links that expire automatically. The search functionality is blazing fast and we can find any document within seconds. Our firm has become significantly more efficient since switching to Vault.`,

  `As a growing startup with teams across three countries, Coralgenz Vault has been the backbone of our collaboration and document management. Before Vault, we were scattered across different storage platforms with no consistency or security. Now everything is centralized, organized, and accessible from anywhere. The version control feature has saved us countless times from accidental overwrites. The permission system lets us give different access levels to different departments which is exactly what we needed. The interface is clean and intuitive and onboarding new team members takes minutes.`,

  `Our accounting firm processes thousands of financial documents for our clients every quarter. Security and organization are non-negotiable for us. Coralgenz Vault delivers on both fronts brilliantly. We create separate vaults for each client with custom access permissions. The automated backup system ensures we never lose data. The document versioning feature is a lifesaver during audit season when we need to track every single change. Client file sharing through encrypted links has replaced our old email attachment system entirely and our clients appreciate the professionalism.`,

  `Working with Coralgenz on our digital transformation has been the best business decision we made this year. They started with a comprehensive audit of our existing systems and then proposed a clear roadmap for modernization. The web application they developed for us handles everything from inventory management to customer relationship tracking. The code quality is excellent and the system has been running without any issues for over six months. Their project management was transparent with weekly updates and demos. We are planning our next project with them already.`,

  `Coralgenz built a custom e-commerce platform for our brand and the results have exceeded every expectation. The website loads in under two seconds, the checkout process is smooth, and the admin dashboard is incredibly intuitive. They integrated our existing inventory system, payment gateways, and shipping providers seamlessly. Since launching the new site our online sales have increased by 60 percent. The design is modern and mobile-responsive and our customers frequently compliment us on the shopping experience. Truly world-class web development from start to finish.`,

  `We hired Coralgenz to develop a mobile application for our food delivery service and they delivered a product that rivals the biggest names in the industry. The app is fast, beautiful, and extremely user-friendly. Features like real-time order tracking, push notifications, and integrated payment work flawlessly. The admin panel lets us manage restaurants, deliveries, and promotions from a single dashboard. The app store ratings from our customers have been consistently above 4.5 stars. The development team was professional, responsive, and a pleasure to work with.`,

  `Coralgenz provided cloud migration services for our enterprise and the entire process was handled with exceptional professionalism. They moved our databases, applications, and file storage to cloud infrastructure without any data loss or significant downtime. The new cloud setup has reduced our IT infrastructure costs by 40 percent and improved performance across the board. They also set up automated backups, scaling rules, and monitoring dashboards that give us complete visibility into our cloud environment. Their expertise in cloud architecture is clearly top-tier.`,

  `The AI solutions that Coralgenz integrated into our customer support system have been nothing short of transformational. The intelligent chatbot they built handles over 70 percent of customer queries without human intervention. For complex issues, the chatbot collects all relevant information and creates a detailed ticket for our support agents. Average response times have dropped from hours to seconds and customer satisfaction scores are at an all-time high. The AI keeps learning from new interactions and gets more accurate every month. This is the future of customer service.`,

  `Our real estate company needed a secure way to store property documents, sale agreements, and client communications. Coralgenz Vault was the perfect fit. Each property has its own folder structure with restricted access for different team members. The digital signature integration means clients can sign documents remotely without any hassle. The storage capacity is generous and the upload speeds are impressive even for large blueprint files. Coralgenz Vault has streamlined our operations and made us look far more professional to our clients.`,

  `Coralgenz developed a complete school management system for our institution covering everything from admissions to examinations to fee management. Teachers can upload lesson plans, track attendance, and communicate with parents through the platform. Students access study materials, submit assignments, and check their grades online. The system has reduced our administrative overhead tremendously and parents love the transparency. The development team understood the education sector extremely well and built features that genuinely solve real problems.`,

  `We run a network of coworking spaces and Coralgenz built a member management platform that handles everything from bookings and billing to access control and community features. Members love the sleek app interface and the ease of booking meeting rooms and desks. Our operations team saves hours every week on billing and reporting. The platform integrates with our door access systems so members can unlock doors by scanning Coralgenz QR codes from their phones. It is a truly smart solution that sets us apart from all our competitors in the market.`,
];

const long4 = [
  `We have been using Coralgenz Vault for our document management needs for about eight months now. The security features are robust and the interface is clean and easy to navigate. File sharing with external clients works well through secure links. The search function is fast and accurate. We had a minor issue during initial setup with bulk file upload but the support team resolved it within a day. Overall we are very satisfied with the product and it has made our team more organized and efficient. Would recommend to other businesses looking for reliable document management.`,

  `The web application Coralgenz developed for us is solid and reliable. It handles our daily operations smoothly and the user interface is intuitive. They were responsive to our feedback during development and made changes promptly. The project was delivered close to the planned timeline with only a small delay in the testing phase. The code quality is good and maintenance has been minimal. We would work with them again for future projects and would recommend their development services to other businesses looking for quality IT solutions.`,

  `Coralgenz QR works great for our event management company. We use it for attendee registration and feedback collection. The scanning is fast and reliable even with large crowds. The custom branding options are nice and help maintain a professional look. We would appreciate a few more template options for the landing pages but the current selection is decent. The pricing is fair for the features offered. Overall a dependable product that does its job well and the customer support team is responsive and friendly whenever we need assistance.`,
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReviews() {
  const reviews = [];

  for (let i = 0; i < NUM_REVIEWS; i++) {
    // 55% south Indian names, 45% US names
    const isSouth = i < NUM_REVIEWS * 0.55 ? true : (Math.random() < 0.45);
    const fn = isSouth ? pickRandom(southFirst) : pickRandom(usaFirst);
    const ln = isSouth ? pickRandom(southLast) : pickRandom(usaLast);
    const name = `${fn} ${ln}`;
    const loc = pickRandom(cities);

    // Star distribution: ~75% five, ~15% four, ~10% three
    let rating;
    const r = Math.random();
    if (r < 0.75) rating = 5;
    else if (r < 0.90) rating = 4;
    else rating = 3;

    // Helpful: higher for higher ratings
    let helpful;
    if (rating === 5) helpful = Math.floor(Math.random() * 850) + 100;
    else if (rating === 4) helpful = Math.floor(Math.random() * 350) + 40;
    else helpful = Math.floor(Math.random() * 120) + 15;

    // Description: mix of short and long
    let desc;
    if (rating === 5) {
      // ~40% long, ~60% short for 5-star
      if (Math.random() < 0.4) {
        desc = pickRandom(long5);
      } else {
        desc = pickRandom(short5);
      }
    } else if (rating === 4) {
      // ~30% long, ~70% short for 4-star
      if (Math.random() < 0.3) {
        desc = pickRandom(long4);
      } else {
        desc = pickRandom(short4);
      }
    } else {
      desc = pickRandom(short3);
    }

    reviews.push({
      id: 40000 + i,
      name,
      location: loc,
      rating,
      description: desc,
      verified: true,
      helpful
    });
  }

  // Shuffle everything
  for (let k = reviews.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [reviews[k], reviews[j]] = [reviews[j], reviews[k]];
  }

  return reviews.map((r, i) => ({ ...r, id: 40000 + i }));
}

const data = generateReviews();
fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2));

const stars = { 5: 0, 4: 0, 3: 0 };
data.forEach(r => stars[r.rating]++);
console.log(`Generated ${data.length} reviews:`);
console.log(`  5★: ${stars[5]} | 4★: ${stars[4]} | 3★: ${stars[3]}`);
