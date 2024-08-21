import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


interface IpaginationProps {
    page: number;
    NbrOfPages: number;
    route: string;
  }

export function PaginationSection({ page, NbrOfPages, route }: IpaginationProps) {
    let Array: number[] = [];

    for (let i = 1; i <= NbrOfPages; i++) {
      Array.push(i);
    }
  
    const prev = page === 1 ? Array.length : page - 1 ; 
    const next = page === Array.length ? 1 : page + 1 ;
  return (
    <section className="w-full p-24">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`${route}?page=${prev}`} />
          </PaginationItem>
          {Array.map((pageNbr, i) => {
          return (
          <PaginationItem key={i}>
            <PaginationLink className={`${pageNbr === page ? 'bg-gray-200' : null}`} href={`${route}?page=${pageNbr}`}>{pageNbr}</PaginationLink>
          </PaginationItem>
          );

        })}
    
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`${route}?page=${next}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
