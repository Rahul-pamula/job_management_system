require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const sampleJobs = [
  {
    title: 'Senior Full Stack Engineer',
    companyName: 'Stripe',
    description:
      '<p>We are seeking a <strong>Senior Full Stack Engineer</strong> to build reliable and scalable developer tools and financial infrastructure. You will architect robust microservices and delight users with crisp, accessible user interfaces.</p><h3>Key Responsibilities</h3><ul><li>Design, implement, and maintain high-throughput payment APIs in Node.js and TypeScript.</li><li>Build reactive frontend user interfaces using Next.js and Tailwind CSS.</li><li>Collaborate with product designers and security engineers on financial compliance standards.</li></ul><p>Join a fast-growing, passionate engineering organization solving global commerce challenges.</p>',
    locationType: 'WFH',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'Redis'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree", "Master's Degree"],
    experienceMin: 4,
    experienceMax: 8,
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Lead Product Designer',
    companyName: 'Figma',
    description:
      '<p>Figma is looking for a <strong>Lead Product Designer</strong> to shape the future of collaborative design tooling. You will lead design systems, interactive prototypes, and cross-platform creative experiences.</p><h3>Requirements</h3><ul><li>Extensive portfolio showcasing system design and complex web applications.</li><li>Deep understanding of design tokens, accessibility, and micro-interactions.</li><li>Proven record leading user research and cross-functional design sprints.</li></ul>',
    locationType: 'Hybrid',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'User Research', 'Prototyping'],
    jobCategory: 'Design',
    education: ["Bachelor's Degree"],
    experienceMin: 5,
    experienceMax: 10,
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Frontend React Developer',
    companyName: 'Vercel',
    description:
      '<p>Help us build the frontend platform for the modern web. We are looking for a skilled <strong>Frontend Developer</strong> passionate about performance, React Server Components, and seamless developer experiences.</p><h3>What You Will Do</h3><ul><li>Develop responsive and accessible web applications using Next.js App Router.</li><li>Optimize frontend bundle sizes and core web vitals.</li><li>Write rigorous unit and end-to-end integration tests.</li></ul>',
    locationType: 'WFH',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 2,
    experienceMax: 5,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'DevOps & Cloud Infrastructure Engineer',
    companyName: 'Datadog',
    description:
      '<p>Datadog is hiring a <strong>DevOps Engineer</strong> to scale our cloud deployment pipelines, Kubernetes clusters, and observability infrastructure.</p><h3>Responsibilities</h3><ul><li>Manage multi-region AWS and GCP cloud infrastructure using Terraform.</li><li>Implement CI/CD workflows with GitHub Actions and ArgoCD.</li><li>Monitor latency, maintain high availability (99.99%), and handle incident response.</li></ul>',
    locationType: 'WFO',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux'],
    jobCategory: 'DevOps',
    education: ["Bachelor's Degree"],
    experienceMin: 3,
    experienceMax: 7,
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Senior Product Manager - AI Platform',
    companyName: 'OpenAI',
    description:
      '<p>Lead product discovery and roadmap execution for our next-generation developer platform and generative AI SDKs.</p><h3>What We Look For</h3><ul><li>Demonstrated experience shipping developer-facing APIs or machine learning tools.</li><li>Strong quantitative skills and intuition for developer workflows.</li><li>Clear communicator able to bridge engineering, research, and go-to-market teams.</li></ul>',
    locationType: 'Hybrid',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    skills: ['Product Management', 'LLMs', 'API Design', 'Data Analysis', 'Roadmapping'],
    jobCategory: 'Product',
    education: ["Bachelor's Degree", "Master's Degree"],
    experienceMin: 5,
    experienceMax: 9,
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Backend Node.js Engineer',
    companyName: 'Linear',
    description:
      '<p>Linear creates high-performance issue tracking software for high-velocity software teams. We are hiring a <strong>Backend Engineer</strong> to scale our real-time sync engine.</p><h3>Highlights</h3><ul><li>Build resilient GraphQL & REST APIs in Node.js and TypeScript.</li><li>Work with Redis pub/sub and distributed queues for instantaneous sync.</li><li>Maintain low-latency database queries on PostgreSQL.</li></ul>',
    locationType: 'WFH',
    skills: ['Node.js', 'TypeScript', 'GraphQL', 'Redis', 'PostgreSQL', 'BullMQ'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 3,
    experienceMax: 6,
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Growth Marketing Lead',
    companyName: 'Notion',
    description:
      '<p>Accelerate Notion adoption among modern enterprises and startups. As our <strong>Growth Marketing Lead</strong>, you will drive customer acquisition, lifecycle campaigns, and conversion rate optimization.</p><h3>Responsibilities</h3><ul><li>Design multi-channel demand generation campaigns across search, social, and email.</li><li>Run systematic A/B tests on landing pages and signup flows.</li><li>Partner with product analytics to measure CAC and LTV cohorts.</li></ul>',
    locationType: 'Hybrid',
    country: 'United States',
    state: 'Washington',
    city: 'Seattle',
    skills: ['Growth Marketing', 'SEO', 'SEM', 'Google Analytics', 'A/B Testing'],
    jobCategory: 'Marketing',
    education: ["Bachelor's Degree"],
    experienceMin: 4,
    experienceMax: 7,
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Machine Learning / Data Scientist',
    companyName: 'Spotify',
    description:
      '<p>Join Spotify’s Personalization team to build recommendation algorithms that connect millions of listeners with their favorite songs, podcasts, and artists.</p><h3>Key Qualifications</h3><ul><li>Strong foundation in Python, PyTorch/TensorFlow, and vector search.</li><li>Experience training and deploying recommendation models at scale.</li><li>Deep understanding of collaborative filtering and content embeddings.</li></ul>',
    locationType: 'Hybrid',
    country: 'United Kingdom',
    state: 'Greater London',
    city: 'London',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'Vector Search', 'SQL'],
    jobCategory: 'Data Science',
    education: ["Master's Degree", 'PhD'],
    experienceMin: 3,
    experienceMax: 7,
    postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Enterprise Account Executive',
    companyName: 'Snowflake',
    description:
      '<p>Drive cloud data platform adoption across Fortune 500 enterprise accounts. You will manage complex multi-stakeholder sales cycles and negotiate enterprise agreements.</p><h3>Requirements</h3><ul><li>Consistent track record of exceeding enterprise quota in SaaS or Data infrastructure.</li><li>Ability to articulate technical value propositions to C-level executives.</li></ul>',
    locationType: 'WFO',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    skills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'CRM', 'Cloud Data'],
    jobCategory: 'Sales',
    education: ["Bachelor's Degree"],
    experienceMin: 5,
    experienceMax: 10,
    postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'QA Automation Engineer',
    companyName: 'Airbnb',
    description:
      '<p>We are seeking a detail-oriented <strong>QA Automation Engineer</strong> to champion quality and reliability across our guest booking and host messaging workflows.</p><h3>What You Will Do</h3><ul><li>Author robust automated test suites using Playwright, Cypress, and Jest.</li><li>Build regression test pipelines integrated with CI/CD gates.</li><li>Collaborate with engineers to prevent bugs before code hits production.</li></ul>',
    locationType: 'WFH',
    skills: ['Playwright', 'Cypress', 'JavaScript', 'Jest', 'CI/CD', 'API Testing'],
    jobCategory: 'QA',
    education: ["Bachelor's Degree"],
    experienceMin: 2,
    experienceMax: 5,
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Associate Product Manager',
    companyName: 'Slack',
    description:
      '<p>Kickstart your product management journey with Slack! You will work with engineers, UX researchers, and customer success teams to refine collaborative messaging workflows.</p><h3>Requirements</h3><ul><li>Strong problem-solving instincts and empathy for end users.</li><li>Excellent communication and analytical skills.</li><li>Technical background or demonstrable software project experience.</li></ul>',
    locationType: 'Hybrid',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    skills: ['Product Thinking', 'Agile', 'User Research', 'Wireframing', 'Data Analysis'],
    jobCategory: 'Product',
    education: ["Bachelor's Degree"],
    experienceMin: 0,
    experienceMax: 2,
    postedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Customer Operations Specialist',
    companyName: 'Shopify',
    description:
      '<p>Help merchants worldwide thrive. You will solve merchant inquiries, improve onboarding workflows, and contribute to internal knowledge bases.</p><h3>What We Look For</h3><ul><li>Empathy, patience, and clear written communication.</li><li>Comfort learning new e-commerce and web platforms quickly.</li></ul>',
    locationType: 'WFH',
    skills: ['Customer Support', 'Zendesk', 'E-commerce', 'Troubleshooting'],
    jobCategory: 'Operations',
    education: ["Bachelor's Degree", 'Diploma'],
    experienceMin: 1,
    experienceMax: 3,
    postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'iOS & Mobile Developer',
    companyName: 'Duolingo',
    description:
      '<p>Build delightful gamified language learning experiences on iOS. You will optimize animations, maintain fluid 60fps UI, and implement offline audio playback.</p><h3>Requirements</h3><ul><li>Strong proficiency with Swift, SwiftUI, and Combine.</li><li>Passion for clean architecture and unit test coverage.</li></ul>',
    locationType: 'Hybrid',
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Pittsburgh',
    skills: ['Swift', 'SwiftUI', 'iOS', 'Mobile Architecture', 'Git'],
    jobCategory: 'Mobile',
    education: ["Bachelor's Degree"],
    experienceMin: 3,
    experienceMax: 6,
    postedDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Junior Web Developer',
    companyName: 'Cloudflare',
    description:
      '<p>Join our developer relations and documentation engineering team. You will build interactive code sandboxes, docs examples, and open-source starter templates.</p><h3>Ideal Candidate</h3><ul><li>Familiarity with HTML, CSS, JavaScript, and modern frameworks.</li><li>Eager to learn edge computing, serverless workers, and distributed systems.</li></ul>',
    locationType: 'WFH',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git'],
    jobCategory: 'Engineering',
    education: ["Bachelor's Degree"],
    experienceMin: 0,
    experienceMax: 2,
    postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
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

  console.log(`Inserting ${sampleJobs.length} diverse job records...`);
  const createdJobs = await Job.insertMany(sampleJobs);
  console.log(`✅ Successfully seeded ${createdJobs.length} jobs!`);
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
