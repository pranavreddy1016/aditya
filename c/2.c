#include<stdio.h>
int binarySearch(int arr[],int low,int high,int key){
    while(low <= high){

        int mid=low+(high-low)/2;

        if(arr[mid]==key){
            return mid;
        }
        else if(arr[mid]>key){
          high = mid - 1;
        }
        else{
            low = mid+1;
        }


        
    }

    return 1;
}

int main(){
    int n,i,key;
    printf("Enter the Size of an Array ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter in Sorted Order \n\n");
    for(i=0;i<n;i++){
        printf("%d Element ",i+1);
        scanf("%d",&arr[i]);
    }

    printf("Enter the Key to Search ");
    scanf("%d",&key);
    int result = binarySearch(arr,0,n-1,key);

    if (result != -1)
    {
        printf("%d Found at index %d", key, result);
    }
    else
    {
        printf("%d Not Found", key);
    }

    return 0;
}