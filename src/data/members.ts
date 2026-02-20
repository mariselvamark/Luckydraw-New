export interface Member {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
}

const members: Member[] = [
  { id: 1, name: 'Nidhi Somani', role: 'Marketing Manager', initials: 'NS', color: '#C62828' },
  { id: 2, name: 'Aarav Bansal', role: 'Product Designer', initials: 'AB', color: '#AD1457' },
  { id: 3, name: 'Riya Sharma', role: 'Software Engineer', initials: 'RS', color: '#6A1B9A' },
  { id: 4, name: 'Mohit Kapoor', role: 'Data Analyst', initials: 'MK', color: '#283593' },
  { id: 5, name: 'Pooja Tiwari', role: 'UX Researcher', initials: 'PT', color: '#00695C' },
  { id: 6, name: 'Sandeep Verma', role: 'Quality Assurance', initials: 'SV', color: '#E65100' },
  { id: 7, name: 'Tara Patel', role: 'UI Designer', initials: 'TP', color: '#4E342E' },
  { id: 8, name: 'Vinay Kumar', role: 'Sales Executive', initials: 'VK', color: '#1B5E20' },
  { id: 9, name: 'Anika Singh', role: 'Content Strategist', initials: 'AS', color: '#0D47A1' },
  { id: 10, name: 'Rajesh Mehta', role: 'Customer Support', initials: 'RM', color: '#BF360C' },
  { id: 11, name: 'Kavita Joshi', role: 'HR Coordinator', initials: 'KJ', color: '#880E4F' },
  { id: 12, name: 'Deepak Rao', role: 'Backend Developer', initials: 'DR', color: '#311B92' },
  { id: 13, name: 'Sneha Gupta', role: 'Project Manager', initials: 'SG', color: '#004D40' },
  { id: 14, name: 'Amit Choudhary', role: 'DevOps Engineer', initials: 'AC', color: '#F57F17' },
  { id: 15, name: 'Priya Nair', role: 'Business Analyst', initials: 'PN', color: '#1A237E' },
  { id: 16, name: 'Rahul Desai', role: 'Frontend Developer', initials: 'RD', color: '#B71C1C' },
  { id: 17, name: 'Meera Iyer', role: 'Technical Writer', initials: 'MI', color: '#33691E' },
  { id: 18, name: 'Suresh Pandey', role: 'System Administrator', initials: 'SP', color: '#E64A19' },
  { id: 19, name: 'Ananya Reddy', role: 'Graphic Designer', initials: 'AR', color: '#7B1FA2' },
  { id: 20, name: 'Karan Malhotra', role: 'Operations Manager', initials: 'KM', color: '#00838F' },
  { id: 21, name: 'Divya Saxena', role: 'Finance Analyst', initials: 'DS', color: '#C62828' },
  { id: 22, name: 'Nikhil Bhatia', role: 'Cloud Architect', initials: 'NB', color: '#4527A0' },
  { id: 23, name: 'Shreya Kulkarni', role: 'Scrum Master', initials: 'SK', color: '#2E7D32' },
  { id: 24, name: 'Arun Thakur', role: 'Mobile Developer', initials: 'AT', color: '#D84315' },
  { id: 25, name: 'Pallavi Menon', role: 'Data Scientist', initials: 'PM', color: '#0277BD' },
];

export default members;
