// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { FileText } from "lucide-react";
// import DocumentCard from "@/components/admin/DocumentsPage/DocumentCard";
// import { Document } from "@/types/admin-documents";

// interface DocumentsListProps {
//     pastPapers: Document[];
//     policyDocs: Document[];
//     onApprove: (id: number, type: string) => void;
//     onReject: (id: number, type: string) => void;
//     onDelete: (id: number, type: string) => void;
// }

// export default function DocumentsList({
//     pastPapers,
//     policyDocs,
//     // onApprove,
//     onReject,
//     onDelete,
// }: DocumentsListProps) {
//     const isEmpty = pastPapers.length === 0 && policyDocs.length === 0;

//     if (isEmpty) {
//         return (
//             <Card>
//                 <CardContent className="text-center py-12">
//                     <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
//                     <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <Tabs defaultValue="past-papers" className="space-y-4">
//             <TabsList>
//                 <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
//                 <TabsTrigger value="policy-docs">Policy Documents</TabsTrigger>
//             </TabsList>

//             <TabsContent value="past-papers" className="space-y-4">
//                 <div className="grid gap-4">
//                     {pastPapers.map((paper) => (
//                         <DocumentCard
//                             key={paper.id}
//                             document={paper}
//                             type="past-paper"
//                             // onApprove={onApprove}
//                             onReject={onReject}
//                             onDelete={onDelete}
//                         />
//                     ))}
//                 </div>
//             </TabsContent>

//             <TabsContent value="policy-docs" className="space-y-4">
//                 <div className="grid gap-4">
//                     {policyDocs.map((doc) => (
//                         <DocumentCard
//                             key={doc.id}
//                             document={doc}
//                             type="policy-doc"
//                             onReject={onReject}
//                             onDelete={onDelete}
//                         />
//                     ))}
//                 </div>
//             </TabsContent>
//         </Tabs>
//     );
// }