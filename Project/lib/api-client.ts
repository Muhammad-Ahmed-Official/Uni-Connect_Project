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
    async getDashboardStats(){
        return this.fetch("admin/dashboard");
    }

    async getDashboardActivity(){
        return this.fetch("admin/dashboard/recent-activity");
    }


    async createEvent(data:object){
        return this.fetch("event/create", {
            method: "POST",
            body: data,
        })
    };

    
    async getEvents(){
        return this.fetch("event/read")
    };


    async updateEvent(data:any, eventId:string){
        return this.fetch(`event/update?eventId=${eventId}`, {
            method: "PUT",
            body: data
        })
    }
    

    async deleteEvent(eventId:string){
        return this.fetch(`event/delete?eventId=${eventId}`, {
            method: "DELETE"
        })
    };

    async eventStats(){
        return this.fetch("admin/event-management/stats")
    };



    async createDepartment(data:object){
        return this.fetch("admin/add-department/create", {
            method: "POST",
            body: data,
        })
    };

    
    async getDepartments(){
        return this.fetch("admin/deaprtment-management")
    };


    async updateDepartment(departmentId:string, data:any){
        return this.fetch(`admin/add-department/update?departmentId=${departmentId}`, {
            method: "PUT",
            body: data
        })
    };
    

    async deleteDepartment(departmentId:string){
        return this.fetch(`admin/add-department/delete?departmentId=${departmentId}`, {
            method: "DELETE"
        })
    };

    async departmentStats(){
        return this.fetch("admin/deaprtment-management/stats")
    }


    async userStats(){
        return this.fetch("admin/user-management/stats")
    }

    async getUsers(){
        return this.fetch("admin/user-management")
    }

}

export const apiClient = new ApiClient();   