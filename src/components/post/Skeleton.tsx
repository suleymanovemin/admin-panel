import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Skeleton,
} from "@mui/material";

const TableSkeleton = () => (
    <TableContainer
        component={Paper}
        sx={{
            height: "calc(100vh - 300px)",
            overflowY: "auto",
        }}
    >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Post
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Type
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Sharing Time
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Status
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Publish Status
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Author
                    </TableCell>
                    <TableCell className="border border-[#F5F5F5] text-[#243C7B] font-semibold">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[1, 2, 3].map((row) => (
                    <TableRow key={row}>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Skeleton variant="rounded" width={128} height={96} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton variant="text" width="80%" height={24} />
                                    <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="rounded" width={100} height={28} />
                        </TableCell>
                        <TableCell>
                            <Box sx={{ textAlign: "center" }}>
                                <Skeleton variant="text" width={80} height={20} sx={{ mx: "auto" }} />
                                <Skeleton variant="text" width={60} height={16} sx={{ mx: "auto", mt: 0.5 }} />
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="rounded" width={80} height={32} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="rounded" width={120} height={40} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" width={100} height={20} />
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TableSkeleton