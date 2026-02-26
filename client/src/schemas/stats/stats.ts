import z from "zod";

export const RecentLoanSchema = z.object({
    id: z.number().int().positive(),
    loan_date: z.string(),
    due_date: z.string(),
    return_date: z.string().nullable(),
    status: z.string(),
    username: z.string(),
    book_title: z.string(),
    book_author: z.string(),
});

export const StatsResponseSchema = z.object({
    totalUsers: z.number(),
    totalBooks: z.number(),
    activeLoans: z.number(),
    overdueLoans: z.number(),
    recentLoans: z.array(RecentLoanSchema),
});

export type StatsResponseType = z.infer<typeof StatsResponseSchema>;
export type RecentLoanType = z.infer<typeof RecentLoanSchema>;
