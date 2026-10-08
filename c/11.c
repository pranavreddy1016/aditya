/*
 Write a C program to check whether given string is palindrome or not by using stack
data structure.
*/
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define MAX 100

char arr[MAX];
int top=-1;

void push(char ch){
    top++;
    arr[top]=ch;

}
char pop(){
    char ch = arr[top];
    top--;
    return ch;
}

int main(){
    char str[MAX];
    int i;
    int len;
    int palindrome = 1;
    printf("Enter the String ");
    gets(str);
    len=strlen(str);
    for(i=0;i<len;i++){
        push(str[i]);
    }

    for(i=0;i<len;i++){
        if(str[i]!=pop()){
            palindrome= 0;
            break;
        }
    }

    if(palindrome==1){
        printf("String is Palindrome ");

    }
    else{
        printf("String is Not Palindrome ");
    }
    return 0;
}