1. we are calling the trpc apis like this : 
   const { data: todos = [] } = trpc.todo.getAll.useQuery();

   but the things is

   =>useQuery, useMutation both are hooks. => hooks can be used only in client components

   so how would we fetch or call the api in server components: 

   (i). create a server-side trpc caller : serverCaller 
        export const serverCaller = async () => {
              return appRouter.createCaller(ctx); };
         
   (ii) now you can go in any server component and use this
        serverCaller like a hook: 
        for example: 

        const ServerTodoComponent = async() => {
               const caller = await serverCaller(); 
               const todos = await caller.todo.getAll(); 
            return (
               <h2>Server Todos</h2>
          )}

2. what do we get in return after calling some api in trpc: 
   
   => const { data, isLoading, error } = trpc.todo.getAll.useQuery();
   => 1. data = actual response data from the api call
      2. isLoading = true/false
                     if the process of fetching is still going on or completed
      3. isSuccess = true/false
      4. error  = contains error details if req fails.
      5. refetch : for refetching 
                   