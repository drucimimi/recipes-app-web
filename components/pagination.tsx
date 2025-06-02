"use client"

import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

/**
 * 
 * @param totalPages
 * @description permet de créer une pagination sur plusieurs éléments (ex: 10 éléments par page)
 * @example
 * ```
     return ( <Pagination totalPages={2} /> )
    ```
 */
const Pagination = ({totalPages}:{totalPages:number}) => {
    const urlParams = useSearchParams()
    const currentPage = urlParams.get("page") ? Number(urlParams.get("page")) : 0
    const router = useRouter()
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1
            router.push(`/web?page=${newPage}`)
        }
    }
    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            const newPage = currentPage + 1
            router.push(`/web?page=${newPage}`)
        }
    }
    return (
        <>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6">
                <Button
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2 text-black"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                </Button>

                <span className="text-sm text-gray-600">
                    Page {currentPage + 1} sur {totalPages}
                </span>

                <Button
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="flex items-center gap-2 text-black"
                >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                </Button>
                </div>
            )}
        </>
    )
}
export default Pagination