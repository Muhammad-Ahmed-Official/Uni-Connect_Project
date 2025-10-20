type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>
}

class ApiClient {
    private async fetch<T>(endPoint: string, options: FetchOptions = {}):Promise<T>{
        const { method = "GET", body, headers = {}} = options;
        
        const defaultHeaders = {
            "Content-type" : "application/json",
            ...headers,
        };

        const response = await fetch(`/api/${endPoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        }); 

        if(!response?.ok) throw new Error(await response.text());
        return response.json();
    };

    // Admin Dashboard
    async createPost(data:object){
        return this.fetch("posts/create", {
            method: "POST"
        })
    };

    async getDepartmentPost(department:string){
        return this.fetch(`posts/read/get-dept-post?department=${department}`)
    };

    async getPost(postId:string){
        return this.fetch(`posts/read/get-single-post?postId=${postId}`)
    };

    async deletePost(postId:string){
        return this.fetch(`posts/delete?postId=${postId}`, {
            method: "DELETE"
        })
    };



    async createComment(){
        return this.fetch("comment/create", {
            method: "POST"
        })
    };

    
    async getComment(entityId:string){
        return this.fetch(`comment/read?entityId=${entityId}`)
    };
    

    async deleteComment(commentId:string){
        return this.fetch(`comment/delete?commentId=${commentId}`, {
            method: "DELETE"
        })
    };
    
    
    async replyComment(){
        return this.fetch("comment/create/reply")
    };



    async createLike(){
        return this.fetch("like/create", {
            method: "POST"
        })
    };

    
    async getLike(){
        return this.fetch("")
    };



    async createEvent(){
        return this.fetch("event/create", {
            method: "POST"
        })
    };

    
    async getEvent(){
        return this.fetch("event/read")
    };
    

    async deleteEvent(eventId:string){
        return this.fetch(`event/delete?eventId=${eventId}`, {
            method: "DELETE"
        })
    };


    async createDepartment(data:object){
        return this.fetch("admin/add-department/create", {
            method: "POST",
            body: data,
        })
    };

    
    async getDepartments(){
        return this.fetch("admin/add-department")
    };
    

    async deleteDepartment(departmentId:string){
        return this.fetch(`admin/add-department/delete?departmentId=${departmentId}`, {
            method: "DELETE"
        })
    };

}

export const apiClient = new ApiClient();   