// Maid data structure
export interface Maid {
  id: number;
  name: string;
  age: number;
  nationality: string;
  experience: number; // years of experience
  rating: number;
  specialties: string[];
  availability: 'Available' | 'Busy' | 'On Leave';
  hourlyRate: number;
  contactNumber: string;
  joinDate: string;
}

// Static maid data
export const maidsData: Maid[] = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    age: 28,
    nationality: 'Philippines',
    experience: 5,
    rating: 4.8,
    specialties: ['House Cleaning', 'Cooking', 'Laundry'],
    availability: 'Available',
    hourlyRate: 25,
    contactNumber: '+971-50-123-4567',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Maria Santos',
    age: 32,
    nationality: 'Philippines',
    experience: 8,
    rating: 4.9,
    specialties: ['Deep Cleaning', 'Ironing', 'Pet Care'],
    availability: 'Busy',
    hourlyRate: 30,
    contactNumber: '+971-55-234-5678',
    joinDate: '2022-06-20'
  },
  {
    id: 3,
    name: 'Fatima Al-Zahra',
    age: 26,
    nationality: 'Indonesia',
    experience: 3,
    rating: 4.6,
    specialties: ['Cooking', 'Childcare', 'House Organization'],
    availability: 'Available',
    hourlyRate: 22,
    contactNumber: '+971-56-345-6789',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    age: 30,
    nationality: 'India',
    experience: 6,
    rating: 4.7,
    specialties: ['House Cleaning', 'Cooking', 'Elderly Care'],
    availability: 'Available',
    hourlyRate: 28,
    contactNumber: '+971-54-456-7890',
    joinDate: '2022-11-05'
  },
  {
    id: 5,
    name: 'Aisha Hassan',
    age: 24,
    nationality: 'Ethiopia',
    experience: 2,
    rating: 4.5,
    specialties: ['Laundry', 'House Cleaning', 'Garden Maintenance'],
    availability: 'On Leave',
    hourlyRate: 20,
    contactNumber: '+971-52-567-8901',
    joinDate: '2023-08-12'
  },
  {
    id: 6,
    name: 'Chen Wei',
    age: 29,
    nationality: 'China',
    experience: 4,
    rating: 4.8,
    specialties: ['Deep Cleaning', 'Window Cleaning', 'Carpet Cleaning'],
    availability: 'Available',
    hourlyRate: 26,
    contactNumber: '+971-58-678-9012',
    joinDate: '2023-02-28'
  },
  {
    id: 7,
    name: 'Rosa Martinez',
    age: 35,
    nationality: 'Philippines',
    experience: 10,
    rating: 5.0,
    specialties: ['Cooking', 'House Management', 'Event Assistance'],
    availability: 'Busy',
    hourlyRate: 35,
    contactNumber: '+971-50-789-0123',
    joinDate: '2021-12-01'
  },
  {
    id: 8,
    name: 'Kamala Devi',
    age: 27,
    nationality: 'Nepal',
    experience: 4,
    rating: 4.6,
    specialties: ['House Cleaning', 'Laundry', 'Plant Care'],
    availability: 'Available',
    hourlyRate: 24,
    contactNumber: '+971-55-890-1234',
    joinDate: '2023-04-18'
  }
];

// Column definitions for the maid table
export const maidsTableColumns = [
  'ID',
  'Name',
  'Age',
  'Nationality',
  'Experience (Years)',
  'Rating',
  'Specialties',
  'Availability',
  'Hourly Rate (AED)',
  'Contact',
  'Join Date'
];

// Formatted data for table display
export const maidsTableRows = maidsData.map(maid => ({
  id: maid.id,
  name: maid.name,
  age: maid.age,
  nationality: maid.nationality,
  experience: `${maid.experience} years`,
  rating: `${maid.rating}/5.0`,
  specialties: maid.specialties.join(', '),
  availability: maid.availability,
  hourlyRate: `${maid.hourlyRate} AED`,
  contact: maid.contactNumber,
  joinDate: maid.joinDate
}));

// Lead data structure
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  source: string;
  serviceType: string;
  budget: number;
  location: string;
  createdDate: string;
  lastContact: string;
  notes: string;
}

// Static leads data
export const leadsData: Lead[] = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    email: 'ahmed.mansouri@email.com',
    phone: '+971-50-123-4567',
    status: 'New',
    source: 'Website',
    serviceType: 'House Cleaning',
    budget: 500,
    location: 'Dubai Marina',
    createdDate: '2024-01-15',
    lastContact: '2024-01-15',
    notes: 'Looking for weekly cleaning service'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+971-55-234-5678',
    status: 'Contacted',
    source: 'Social Media',
    serviceType: 'Deep Cleaning',
    budget: 800,
    location: 'Jumeirah',
    createdDate: '2024-01-14',
    lastContact: '2024-01-16',
    notes: 'Interested in one-time deep cleaning'
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    email: 'm.hassan@email.com',
    phone: '+971-56-345-6789',
    status: 'Qualified',
    source: 'Referral',
    serviceType: 'Regular Cleaning + Cooking',
    budget: 1200,
    location: 'Downtown Dubai',
    createdDate: '2024-01-12',
    lastContact: '2024-01-17',
    notes: 'Needs regular maid service 3x per week'
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+971-54-456-7890',
    status: 'Converted',
    source: 'Google Ads',
    serviceType: 'Childcare + Cleaning',
    budget: 1500,
    location: 'Business Bay',
    createdDate: '2024-01-10',
    lastContact: '2024-01-18',
    notes: 'Successfully matched with Maria Santos'
  },
  {
    id: 5,
    name: 'Omar Al-Zahra',
    email: 'omar.zahra@email.com',
    phone: '+971-52-567-8901',
    status: 'Lost',
    source: 'Website',
    serviceType: 'House Cleaning',
    budget: 300,
    location: 'Sharjah',
    createdDate: '2024-01-08',
    lastContact: '2024-01-12',
    notes: 'Budget too low for our services'
  },
  {
    id: 6,
    name: 'Jennifer Smith',
    email: 'j.smith@email.com',
    phone: '+971-58-678-9012',
    status: 'Contacted',
    source: 'Instagram',
    serviceType: 'Pet Care + Cleaning',
    budget: 900,
    location: 'JLT',
    createdDate: '2024-01-16',
    lastContact: '2024-01-17',
    notes: 'Has 2 cats, needs specialized care'
  },
  {
    id: 7,
    name: 'Khalid Al-Ahmed',
    email: 'khalid.ahmed@email.com',
    phone: '+971-50-789-0123',
    status: 'New',
    source: 'Referral',
    serviceType: 'Elderly Care',
    budget: 2000,
    location: 'Palm Jumeirah',
    createdDate: '2024-01-18',
    lastContact: '2024-01-18',
    notes: 'Caring for elderly parents'
  },
  {
    id: 8,
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+971-55-890-1234',
    status: 'Qualified',
    source: 'Website',
    serviceType: 'Event Assistance',
    budget: 600,
    location: 'DIFC',
    createdDate: '2024-01-13',
    lastContact: '2024-01-16',
    notes: 'Monthly dinner party assistance needed'
  }
];

// Column definitions for the leads table
export const leadsTableColumns = [
  'ID',
  'Name',
  'Email',
  'Phone',
  'Status',
  'Source',
  'Service Type',
  'Budget (AED)',
  'Location',
  'Created Date',
  'Last Contact'
];

// Formatted data for leads table display
export const leadsTableRows = leadsData.map(lead => ({
  id: lead.id,
  name: lead.name,
  email: lead.email,
  phone: lead.phone,
  status: lead.status,
  source: lead.source,
  serviceType: lead.serviceType,
  budget: `${lead.budget} AED`,
  location: lead.location,
  createdDate: lead.createdDate,
  lastContact: lead.lastContact
}));

// Team Member data structure
export interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  salary: number;
  manager: string;
  location: string;
  skills: string[];
}

// Static team members data
export const teamMembersData: TeamMember[] = [
  {
    id: 1,
    name: 'Fatima Al-Rashid',
    email: 'fatima.rashid@maidservice.com',
    phone: '+971-50-111-2222',
    role: 'Operations Manager',
    department: 'Operations',
    status: 'Active',
    joinDate: '2022-03-15',
    salary: 8000,
    manager: 'CEO',
    location: 'Dubai',
    skills: ['Team Management', 'Operations', 'Customer Service']
  },
  {
    id: 2,
    name: 'John Williams',
    email: 'john.williams@maidservice.com',
    phone: '+971-55-222-3333',
    role: 'Customer Service Representative',
    department: 'Customer Service',
    status: 'Active',
    joinDate: '2023-01-20',
    salary: 4500,
    manager: 'Fatima Al-Rashid',
    location: 'Dubai',
    skills: ['Communication', 'Problem Solving', 'CRM Systems']
  },
  {
    id: 3,
    name: 'Aisha Mohammed',
    email: 'aisha.mohammed@maidservice.com',
    phone: '+971-56-333-4444',
    role: 'HR Coordinator',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2022-08-10',
    salary: 5500,
    manager: 'Fatima Al-Rashid',
    location: 'Dubai',
    skills: ['Recruitment', 'Employee Relations', 'Training']
  },
  {
    id: 4,
    name: 'David Chen',
    email: 'david.chen@maidservice.com',
    phone: '+971-54-444-5555',
    role: 'Quality Supervisor',
    department: 'Quality Assurance',
    status: 'Active',
    joinDate: '2022-11-05',
    salary: 6000,
    manager: 'Fatima Al-Rashid',
    location: 'Dubai',
    skills: ['Quality Control', 'Training', 'Process Improvement']
  },
  {
    id: 5,
    name: 'Mariam Al-Zahra',
    email: 'mariam.zahra@maidservice.com',
    phone: '+971-52-555-6666',
    role: 'Marketing Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-02-14',
    salary: 5000,
    manager: 'CEO',
    location: 'Dubai',
    skills: ['Digital Marketing', 'Social Media', 'Content Creation']
  },
  {
    id: 6,
    name: 'Roberto Silva',
    email: 'roberto.silva@maidservice.com',
    phone: '+971-58-666-7777',
    role: 'Finance Assistant',
    department: 'Finance',
    status: 'On Leave',
    joinDate: '2022-06-30',
    salary: 4800,
    manager: 'CEO',
    location: 'Dubai',
    skills: ['Accounting', 'Financial Analysis', 'Excel']
  },
  {
    id: 7,
    name: 'Nadia Hassan',
    email: 'nadia.hassan@maidservice.com',
    phone: '+971-50-777-8888',
    role: 'Training Coordinator',
    department: 'Training',
    status: 'Active',
    joinDate: '2023-04-12',
    salary: 5200,
    manager: 'Aisha Mohammed',
    location: 'Dubai',
    skills: ['Training Development', 'Curriculum Design', 'Assessment']
  },
  {
    id: 8,
    name: 'Ahmed Khalil',
    email: 'ahmed.khalil@maidservice.com',
    phone: '+971-55-888-9999',
    role: 'IT Support Specialist',
    department: 'IT',
    status: 'Active',
    joinDate: '2022-09-18',
    salary: 5800,
    manager: 'CEO',
    location: 'Dubai',
    skills: ['Technical Support', 'Network Administration', 'Software Troubleshooting']
  }
];

// Column definitions for the team members table
export const teamMembersTableColumns = [
  'ID',
  'Name',
  'Email',
  'Role',
  'Department',
  'Status',
  'Join Date',
  'Salary (AED)',
  'Manager',
  'Location'
];

// Formatted data for team members table display
export const teamMembersTableRows = teamMembersData.map(member => ({
  id: member.id,
  name: member.name,
  email: member.email,
  role: member.role,
  department: member.department,
  status: member.status,
  joinDate: member.joinDate,
  salary: `${member.salary} AED`,
  manager: member.manager,
  location: member.location
}));
