require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const sampleJobs = [
  {
    title: 'Software Engineer III - Cloud Platform',
    companyName: 'Google',
    description:
      '<p>Google Hyderabad is seeking a <strong>Software Engineer III</strong> to join our Core Cloud Platform engineering group. You will architect distributed systems that power globally available infrastructure services.</p><h3>Key Responsibilities</h3><ul><li>Design, implement, and maintain large-scale distributed backend systems in Go, C++, or Java.</li><li>Improve latency, reliability, and security across global microservices.</li><li>Collaborate with product and site reliability engineering teams across Bangalore and Mountain View.</li></ul>',
    locationType: 'WFO',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['Go', 'C++', 'Java', 'Distributed Systems', 'Kubernetes', 'GCP'],
    jobCategory: 'Engineering',
    education: ["Bachelor's in Computer Science", "Master's Degree"],
    experienceMin: 3,
    experienceMax: 7,
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Senior Backend Engineer - Azure Cloud',
    companyName: 'Microsoft',
    description:
      '<p>Join Microsoft IDC Hyderabad. We are looking for a <strong>Senior Backend Engineer</strong> to develop foundational services for Microsoft Azure enterprise customers.</p><h3>What You Will Do</h3><ul><li>Build resilient, high-throughput microservices using C#, .NET Core, and Azure Cosmos DB.</li><li>Implement telemetry and automated fault-tolerance mechanisms.</li><li>Mentor early-career engineers and drive engineering excellence.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['C#', '.NET Core', 'Azure', 'CosmosDB', 'Microservices', 'Docker'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 5,
    experienceMax: 9,
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Full Stack Developer - Prime Video',
    companyName: 'Amazon',
    description:
      '<p>Amazon Hyderabad is hiring a <strong>Full Stack Developer</strong> for the Prime Video Core Experience team. Help create seamless streaming and browsing interfaces for hundreds of millions of users worldwide.</p><h3>Requirements</h3><ul><li>Strong proficiency in React, TypeScript, Node.js, and AWS Lambda.</li><li>Experience with high-scale frontend architectures and server-side rendering.</li><li>Solid understanding of web vitals and client-side caching.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Next.js', 'GraphQL'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 2,
    experienceMax: 6,
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Lead Frontend Architect',
    companyName: 'Flipkart',
    description:
      '<p>Flipkart Bangalore is seeking a visionary <strong>Lead Frontend Architect</strong> to steer consumer web performance and next-generation design systems during Big Billion Days events.</p><h3>Responsibilities</h3><ul><li>Lead the UI architecture across e-commerce categories serving millions of daily visitors.</li><li>Optimize initial page load, web workers, and edge rendering pipelines.</li><li>Work closely with UX researchers and business leaders.</li></ul>',
    locationType: 'WFO',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['React', 'Next.js', 'TypeScript', 'Web Performance', 'Design Systems', 'Redux'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree", "Master's Degree"],
    experienceMin: 6,
    experienceMax: 11,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Senior Product Designer - Consumer Experience',
    companyName: 'Swiggy',
    description:
      '<p>Swiggy is looking for a passionate <strong>Senior Product Designer</strong> in Bangalore to craft intuitive hyper-local delivery and dining discovery flows.</p><h3>What We Look For</h3><ul><li>Impressive portfolio showing end-to-end mobile and web design processes.</li><li>Proficiency in Figma, interactive design systems, and rapid prototyping.</li><li>Data-informed decision making combined with deep user empathy.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Design Systems', 'Wireframing'],
    jobCategory: 'Design',
    education: ["Bachelor's Degree"],
    experienceMin: 4,
    experienceMax: 8,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'DevOps & Site Reliability Engineer',
    companyName: 'Razorpay',
    description:
      '<p>Razorpay powers payments for top digital brands in India. We need a <strong>DevOps & SRE Engineer</strong> in Bangalore to guarantee 99.999% uptime for core financial gateways.</p><h3>Duties</h3><ul><li>Manage multi-region Kubernetes clusters on AWS with Terraform and Helm.</li><li>Build automated disaster recovery and zero-downtime deployment pipelines.</li><li>Implement deep observability with Prometheus, Grafana, and ELK stack.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Prometheus', 'Docker', 'Linux', 'Python'],
    jobCategory: 'DevOps',
    education: ["Bachelor's Degree"],
    experienceMin: 3,
    experienceMax: 7,
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Mobile React Native Engineer',
    companyName: 'CRED',
    description:
      '<p>CRED Bangalore is hiring a <strong>React Native Engineer</strong> who obsesses over 60fps animations, fluid haptic feedback, and exceptional visual design polish.</p><h3>Requirements</h3><ul><li>Deep expertise in React Native, Reanimated 2/3, and mobile performance tuning.</li><li>Understanding of native bridge communication (iOS Swift / Android Kotlin).</li><li>Passion for building world-class financial lifestyle apps.</li></ul>',
    locationType: 'WFO',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['React Native', 'TypeScript', 'iOS', 'Android', 'Redux', 'Animation'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 2,
    experienceMax: 5,
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Core Systems Go / Python Developer',
    companyName: 'Zerodha',
    description:
      '<p>Zerodha Bangalore is looking for a <strong>Systems Developer</strong> to build ultra-fast, minimalist trading and order management backends.</p><h3>Expectations</h3><ul><li>Proficiency in Go, Python, and PostgreSQL with a philosophy of simple, clean code.</li><li>Experience handling high-concurrency order books and low-latency networking.</li><li>Strong understanding of Linux internals, memory management, and Redis caching.</li></ul>',
    locationType: 'WFH',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['Go', 'Python', 'PostgreSQL', 'Redis', 'Linux', 'Distributed Systems'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 3,
    experienceMax: 8,
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Cloud Infrastructure Architect',
    companyName: 'ServiceNow',
    description:
      '<p>ServiceNow Hyderabad is searching for a <strong>Cloud Infrastructure Architect</strong> to scale multi-tenant SaaS environments and enterprise digital workflows.</p><h3>Responsibilities</h3><ul><li>Define target architectures for hyperscale cloud platforms and private cloud datacenters.</li><li>Ensure compliance with ISO, SOC2, and data sovereignty regulations.</li><li>Partner with global engineering leaders to accelerate container migration.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['AWS', 'Kubernetes', 'System Architecture', 'Java', 'Terraform', 'Security'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree", "Master's Degree"],
    experienceMin: 8,
    experienceMax: 14,
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Senior Data Engineer - Mobility Analytics',
    companyName: 'Uber',
    description:
      '<p>Uber Tech Center Hyderabad is hiring a <strong>Senior Data Engineer</strong> to design real-time data pipelines for pricing, dispatch, and safety algorithms.</p><h3>Requirements</h3><ul><li>Hands-on experience with Apache Spark, Kafka, Presto, and Hadoop clusters.</li><li>Strong proficiency in SQL, Python, and Scala data transformation pipelines.</li><li>Ability to model complex data warehouses serving petabytes of daily trip events.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['Python', 'Apache Spark', 'Kafka', 'SQL', 'Hadoop', 'AWS'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 4,
    experienceMax: 8,
    postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Principal Product Manager - Developer Tools',
    companyName: 'Atlassian',
    description:
      '<p>Atlassian Bangalore is seeking a <strong>Principal Product Manager</strong> to own roadmap execution for Jira Cloud integrations and developer ecosystems.</p><h3>Key Responsibilities</h3><ul><li>Define product vision, customer discovery cycles, and metrics-driven delivery.</li><li>Synthesize customer feedback from global engineering leaders into clear PRDs.</li><li>Collaborate with cross-functional teams across Sydney, San Francisco, and Bangalore.</li></ul>',
    locationType: 'WFH',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['Product Strategy', 'Roadmapping', 'Agile', 'Jira', 'Data Analysis', 'User Research'],
    jobCategory: 'Product',
    education: ["Bachelor's Degree", "MBA"],
    experienceMin: 7,
    experienceMax: 12,
    postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Technical Support & Solutions Engineer',
    companyName: 'Salesforce',
    description:
      '<p>Join Salesforce Hyderabad as a <strong>Technical Support Engineer</strong>. You will diagnose enterprise customer integrations, Apex triggers, and Lightning web components.</p><h3>Qualifications</h3><ul><li>Solid understanding of object-oriented programming, REST APIs, and SQL/SOQL.</li><li>Exceptional debugging mindset and customer communication skills.</li><li>Eagerness to earn Salesforce platform certifications and lead root cause analysis.</li></ul>',
    locationType: 'WFO',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['Apex', 'JavaScript', 'REST APIs', 'SQL', 'Salesforce CRM', 'Debugging'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 1,
    experienceMax: 4,
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Staff Security Engineer - Infrastructure & IAM',
    companyName: 'PhonePe',
    description:
      '<p>PhonePe Bangalore is looking for a <strong>Staff Security Engineer</strong> to safeguard India’s leading UPI payments platform handling billions of monthly transactions.</p><h3>Responsibilities</h3><ul><li>Lead threat modeling, penetration testing, and zero-trust IAM implementations.</li><li>Audit container security, cloud posture, and cryptographic key management.</li><li>Coordinate real-time incident detection and SOC responses.</li></ul>',
    locationType: 'WFO',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['Cybersecurity', 'IAM', 'Penetration Testing', 'Cryptography', 'Kubernetes', 'Linux'],
    jobCategory: 'DevOps',
    education: ["Bachelor's Degree"],
    experienceMin: 6,
    experienceMax: 11,
    postedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Database Cloud Performance Engineer',
    companyName: 'Oracle',
    description:
      '<p>Oracle Cloud Infrastructure (OCI) in Hyderabad is hiring a <strong>Database Performance Engineer</strong> to benchmark Autonomous Database engines.</p><h3>What You Will Do</h3><ul><li>Optimize query plans, execution latencies, and storage I/O subsystems.</li><li>Write performance diagnostics in C, Python, and shell scripts.</li><li>Analyze complex memory dumps and kernel bottlenecks under extreme stress workloads.</li></ul>',
    locationType: 'Hybrid',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    skills: ['Oracle Database', 'SQL Tuning', 'Linux Kernel', 'C', 'Python', 'Storage I/O'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree", "Master's Degree"],
    experienceMin: 4,
    experienceMax: 9,
    postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Developer Relations & API Ecosystem Specialist',
    companyName: 'Postman',
    description:
      '<p>Postman Bangalore is looking for a <strong>Developer Relations Specialist</strong> passionate about REST, GraphQL, and modern API-first architectures.</p><h3>Highlights</h3><ul><li>Build open-source collections, tutorials, and starter kits for global developers.</li><li>Speak at developer meetups, conferences, and hackathons across India.</li><li>Provide technical feedback to the core product team based on community needs.</li></ul>',
    locationType: 'WFH',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    skills: ['API Design', 'Postman', 'JavaScript', 'Node.js', 'Technical Writing', 'Public Speaking'],
    jobCategory: 'Marketing',
    education: ["Bachelor's Degree"],
    experienceMin: 2,
    experienceMax: 6,
    postedDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
  },
];

async function seedJobs(forceReset = false) {
  const count = await Job.countDocuments();
  if (count > 0 && !forceReset) {
    console.log(`Database already contains ${count} jobs. Skipping auto-seed.`);
    return;
  }

  if (forceReset) {
    console.log('Clearing existing jobs collection...');
    await Job.deleteMany({});
  }

  console.log(`Inserting ${sampleJobs.length} diverse job records for Hyderabad & Bangalore, India...`);
  const createdJobs = await Job.insertMany(sampleJobs);
  console.log(`✅ Successfully seeded ${createdJobs.length} jobs in Hyderabad & Bangalore!`);
}

async function runStandalone() {
  try {
    await connectDB();
    await seedJobs(true);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runStandalone();
}

module.exports = {
  sampleJobs,
  seedJobs,
};
