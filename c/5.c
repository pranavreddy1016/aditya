// Write a C program to accept n elements from user. Sort n elements in ascending order
// using Insertion sort algorithm. 

#include<stdio.h>
void iniSerction(int arrr[],int n){
    int key,j;
    for(int i=1;i<n;i++){
        key=arrr[i];
        j=i-1;
        while(j>=0 && arrr[j]>key){
            arrr[j+1]=arrr[j];
            j=j-1;
        }
        arrr[j+1]=key;
    }
}
int main(){

    int n;
    printf("Enter the Size of Array : ");
    scanf("%d",&n);

    int arrr[n];

    printf("Enter the Elements Of the Array ");
    for(int i=0;i<n;i++){
        scanf("%d",&arrr[i]);
    }

    iniSerction(arrr,n);
   
    for(int i=0;i<n;i++){
        printf("%d ",arrr[i]);
    }
    return 0;
}