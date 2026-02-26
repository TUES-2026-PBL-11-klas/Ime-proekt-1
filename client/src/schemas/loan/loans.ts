import z from "zod";

export const LoanObjectSchema = z.object({
    id: z.number().int().positive(),
    user_id: z.number().int().positive().optional(),
    book_id: z.number().int().positive().optional(),
    loan_date: z.string(),
    due_date: z.string(),
    return_date: z.string().nullable(),
    status: z.enum(["active", "returned"]),
    username: z.string().optional(),
    book_title: z.string().optional(),
    book_author: z.string().optional(),
});

export type LoanObjectType = z.infer<typeof LoanObjectSchema>;

export const GetActiveLoansResponseSchema = z.array(LoanObjectSchema);
export type GetActiveLoansResponseType = z.infer<typeof GetActiveLoansResponseSchema>;

export const GetOverdueLoansResponseSchema = z.array(LoanObjectSchema);
export type GetOverdueLoansResponseType = z.infer<typeof GetOverdueLoansResponseSchema>;

export const GetMyLoansResponseSchema = z.array(LoanObjectSchema);
export type GetMyLoansResponseType = z.infer<typeof GetMyLoansResponseSchema>;

export const ReturnLoanResponseSchema = z.object({
    message: z.string(),
    loan: LoanObjectSchema,
});
export type ReturnLoanResponseType = z.infer<typeof ReturnLoanResponseSchema>;

export const BorrowBookResponseSchema = LoanObjectSchema;
export type BorrowBookResponseType = z.infer<typeof BorrowBookResponseSchema>;

export const BorrowBookRequestSchema = z.object({
    bookId: z.number().int().positive(),
});
export type BorrowBookRequestType = z.infer<typeof BorrowBookRequestSchema>;
