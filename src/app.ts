
const startApp = async () => {
    let currentPageNumber=1;
    // we need this arrayIndex value to track array index position
    let arrayIndex = 1;
    let response;
    const BASE_URL = (pageNumber: number)=>`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNumber}`;

    const pageView = document.querySelector('[data-pageview="pageView"]');
    const nextBtn = document.querySelector('[data-nextbtn="nextBtn"]');
    const prevBtn = document.querySelector('[data-prevbtn="prevBtn"]');
    const tBody = document.querySelector('[data-sink="tableBody"]');

    const getData = async (currentPageNumber: number) => {
        try{
            const res = await fetch(BASE_URL(currentPageNumber));
            const data = await res.json();
            // console.log("res is", data);
            return data;
        }catch(err){
            alert(err?.message || err?.response?.data?.message);
            throw new Error(err);
        }
    }

    const populateTable = (tableData: IRows) => {
        // clear the current table data
        tBody?.replaceChildren("");

        // iterate over the tableData
        tableData?.forEach((data, idx)=>{
            const trow = document.createElement("tr");
            trow.setAttribute("data-entryid", data.id);

            const tColumn1 = document.createElement("td");
            const tColumn2 = document.createElement("td");
            const tColumn3 = document.createElement("td");

            const firstCol = document.createTextNode(data.row.toString());
            const secondCol = document.createTextNode(data.gender);
            const thirdCol = document.createTextNode(data.age.toString());

            tColumn1.appendChild(firstCol);
            tColumn2.appendChild(secondCol);
            tColumn3.appendChild(thirdCol);

            trow.appendChild(tColumn1)
            trow.appendChild(tColumn2)
            trow.appendChild(tColumn3)
            // tr.setAttribute()

            tBody?.append(trow);

        })
    }

    const handleNextClick = async() => {
        // currentPageNumber+=1;
        enableBtn(prevBtn);
        // using just this was not enough to track array index
        currentPageNumber+=1;
        
        // TODO: check if next exists
        if(arrayIndex % 2 === 1){
            arrayIndex+=1;
            populateTable(response?.results[0][arrayIndex]);
        }else{
            // make the call
            arrayIndex+=1;
            response = await getData(arrayIndex);
            populateTable(response?.results[0][arrayIndex]);
        }
        setPageIndex(currentPageNumber);
    }

    const setPageIndex = (page: number) => {
        pageView?.replaceChildren("");
        const currentPageText = document.createTextNode(`Showing Page ${page}`);
        pageView?.appendChild(currentPageText);
    }

    const handlePrevClick = async () => {
        
        currentPageNumber -= 1;
        // if current page is 1, disable prev button
        currentPageNumber===1 && disableBtn(prevBtn);
        // if current page is odd, make api call
        if(arrayIndex%2 === 1){
            arrayIndex-=1;
            response = await getData(arrayIndex -1);
            populateTable(response?.results[0][arrayIndex]);
        }else{
            arrayIndex-=1;
            populateTable(response?.results[0][arrayIndex]);
        }
        setPageIndex(currentPageNumber);
    }

    const disableBtn = (btn) => {
        btn?.setAttribute("disabled", "disabled");
    }

    const enableBtn = (btn) => {
        btn?.removeAttribute("disabled");
    }

    nextBtn?.addEventListener("click", handleNextClick);
    prevBtn?.addEventListener("click", handlePrevClick);

    //disable both prev and next buttons until data is loaded
    disableBtn(nextBtn);
    disableBtn(prevBtn);

    response = await getData(currentPageNumber);
    setPageIndex(currentPageNumber);
    // if there is next, enable next button
    if(response?.results[0].paging.next){
        enableBtn(nextBtn);
    }

    // populate table
    populateTable(response?.results[0][currentPageNumber]);
};

document.addEventListener('DOMContentLoaded', startApp);
