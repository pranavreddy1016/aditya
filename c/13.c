/*
Write a C Program to implement a Queue of integers using a Static implementation.
Implement enqueue(), dequeue() and display() operations on Queue.
*/
#include<stdio.h>
#include<stdlib.h>
struct node{
    int data;
    struct node * next;
};

struct node * front = NULL;
struct node * rear = NULL;
void enqueue(int x){
    struct node * newnode;
    newnode=(struct node *)malloc(sizeof(struct node));
    newnode->data=x;
    newnode->next=NULL;
    if(front == NULL && rear==NULL){
        front=rear=newnode;
    }
    else{
        rear->next=newnode;
        rear=newnode;

    }

}

void dequeue(){
    struct node *temp;

    if(front == NULL){
        printf("Queue is Empty\n");
        return;
    }

    temp = front;
    front = front->next;

    if(front == NULL){
        rear = NULL;
    }

    free(temp);

}
void display(){
    struct node * temp = front;
    if(front==NULL){
        printf("Queue is Empty ");
        return;
    }
    else{
        while(temp!=NULL){
            printf("%d -> ",temp->data);
            temp=temp->next;
        }
        printf("NULL");
    }
}
void peek(){
    if(front == NULL){
        printf("Queue is Empty\n");
        return;
    }
    printf("%d is Peek Element\n", front->data);
}
int main(){
    int choice;
    int x;
    while(1){
        printf("\n1. Enqueue");
        printf("\n2. Dequeue");
        printf("\n3. Display");
        printf("\n4. Peek");
        printf("\n5. Exit");
        printf("\nEnter Your Choice : ");
        scanf("%d",&choice);
        switch(choice){
            case 1:
                printf("Enter the Daata : ");
                scanf("%d",&x);
                enqueue(x);
                break;
            case 2:
                dequeue();
                display();
                break;
            case 3:
                display();
                break;
            case 4:
                peek();
                break;
            case 5:
                return 0;
            default :
                printf("Enter Valid Choice ");
        }
    }
    return 0;
}