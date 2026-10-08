#include<stdio.h>
#include<stdlib.h>
#define MAX 6
int arr[MAX];
int front = -1;
int rear = -1;
void enqueue(int x){
     if(rear == MAX - 1){
        printf("Queue is Full\n");
        return;
    }
    if(front == -1 && rear == -1 ){
        front=rear = 0;
        arr[rear]=x;
    }
    else{
        rear++;
        arr[rear]=x;
    }
}
void dequeue(){

    if(front == -1 && rear == -1){
        printf("Queue is Empty\n");
        return;
    }

    printf("%d is Deleted\n", arr[front]);
    if(front == rear){
        front = rear = -1;
    }
    else{
        front++;
    }
}

void display(){
    if(front == -1 && rear == -1){
        printf("Queue is Empty\n");
        return;
    }

    for(int i = front; i <= rear; i++){
        printf("%d  ", arr[i]);
    }
    printf("\n");
}
void peek(){
     if(front == -1 && rear == -1){
        printf("Queue is Empty\n");
        return;
    }

    printf("%d is Peek Element ",arr[front]);
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
                printf("Enter the Data : ");
                scanf("%d",&x);
                enqueue(x);
                break;
            case 2:
                dequeue();
                
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