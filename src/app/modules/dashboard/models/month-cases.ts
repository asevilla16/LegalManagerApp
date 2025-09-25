export interface MonthCases {
  count: number;
  cases: StatisticsCase[];
}

interface StatisticsCase {
  id: number;
  title: string;
  caseNumber: string;
  caseType: string;
  caseStatus: string;
  courtType: string;
  filingDate: Date;
  assignments: StatisticUser[];
}

interface StatisticUser {
  id: string;
  firstName: string;
  lastName: string;
}
