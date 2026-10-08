#include<stdio.h>
#include<stdlib.h>
struct stack{
    int dat;
    struct stack * next;
};
struct stack * top = NULL;
void push(int n){
    struct stack *newnode;
    newnode=(struct stack*)malloc(sizeof(struct stack));
    newnode->dat=n;
    newnode->next=top;
    top=newnode;

    
}
void pop(){
    struct stack * temp=top;
    if(top==NULL){
        printf("Stack is Empty \n");
        return;
    }
    else{
        top=top->next;
    }
    free(temp);
}
void didplay(){
   
    struct stack * temp=top;
    if(top==NULL){
        printf("Stack is Empty \n");
        return;
    }
    else{
        while(temp!=NULL){
            printf("%d -> ",temp->dat);
            temp=temp->next;
        }
        printf("NULL\n");
    }
}
void peek(){
    struct stack * temp =top;
    if(top==NULL){
        printf("Stack is Empty \n");
        return;
    }
    printf("%d is Peek Element \n",temp->dat);

}

int main(){
    int choice,n;
    while(1){
        printf("\n1. Push");
        printf("\n2. Pop");
        printf("\n3. Display");
        printf("\n4. Peek");
        printf("\n5. Exit");
        printf("\nEnter the Data ");
        scanf("%d",&choice);
        switch(choice){
            case 1:
                printf("\nEnter the Data ");
                scanf("%d",&n);
                push(n);
                break;
            case 2:
                pop();
                didplay();
                break;

            case 3:
                didplay();
                break;

            case 4:
                peek();
                break;


            case 5:
                return 0;
            default :
                printf("\nEnter the Valid Choice \n");

        }
 
    }

    return 0;
}