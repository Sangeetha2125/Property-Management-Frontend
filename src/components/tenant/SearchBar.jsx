export default function SearchBar(){
    return(
    <div>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[400px] lg:w-1/2"
          />
          
    </div>
    )
}