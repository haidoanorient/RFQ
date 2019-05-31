export class Applicant {
    id: string;
    email: string;
    fullName: string;
    address: string;
    phoneNumber?: string;
    description?: string;
    status: ApplicantStatus;
    dateOfBirth?: string;
    createdDate: string;
    updatedDate: string;
}

export enum ApplicantStatus {
    New = 0,
    Applicant_Review = 1,
    Applicant_Completed = 2,
    Agent_Review = 3,
    Agent_Reviewed = 4,
    Agent_Decilined = 5,
    Agent_Approved = 6,
}

export const ApplicantStatusDisplay = [
    'New',
    'Applicant_Review',
    'Applicant_Completed',
    'Agent_Review',
    'Agent_Reviewed',
    'Agent_Decilined',
    'Agent_Approved'
];
