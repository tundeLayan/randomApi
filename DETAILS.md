# How does this work

## Steps in creating the app


1.  The shape of data coming in is such that data for Nth page and (N+1)th page comes together.
2.  When app first loads, it populates the table with the Nth data in the array
3.  To be efficient with server calls, there has to be a condition to check when a call to the server should be made, or when we should just move on to the next data we have already loaded.
4.  When we click on the next button when we are on an odd numbered page. i.e. 1, 3, 5 , we just move on to the next index for the data we already loaded.
5.  When we click on the next button when we are on an even numbered page, we make an API call to fetch the next set of data which is still in the N, N+1 format.
6.  When the prev button is clicked and we are on an even numbered page, we will set the index to the previous page and then fetch data for N-2.