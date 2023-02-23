import React from 'react'
import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';


const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext()

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    }) //index+1 ->Because array starts from an 0th index And we want index as 1 [Array.from() functionality refer (https://youtu.be/zg1Bv4xubwo)]
    // console.log(pages)


    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
          // newPage = 1
          // alternative
          newPage = numOfPages;
        }
        changePage(newPage);
      };
      const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
          // newPage = numOfPages
          // alternative
          newPage = 1;
        }
        changePage(newPage);
    }
    return (
        //! Pagination Buttons
        <Wrapper>
            <button className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />prev
            </button>
            <div className='btn-container'>
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type='button'
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            key={pageNumber}
                            onClick={() => changePage(pageNumber)}
                        >
                            {pageNumber}
                        </button>)
                })}
            </div>
            <button className='next-btn' onClick={nextPage}>
                next<HiChevronDoubleRight />
            </button>

        </Wrapper>
    )
}

export default PageBtnContainer