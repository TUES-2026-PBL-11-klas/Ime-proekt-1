export const isAdminRoute = (path: string): boolean => {
    return path.startsWith("/admin")
}