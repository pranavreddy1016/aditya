// Write a C Program to implement a Stack of integers using a static implementation.
// Implement push(), pop() operations on stack. Write a menu driven program.

#include <stdio.h>
#include <stdlib.h>
#define MAX 5
struct stack
{
    int data[MAX];
    int top;
};
void intii(struct stack *s){
    s->top=-1;
}

void push(struct stack *s){

int da;

printf("Enter Data ");
scanf("%d",&da);

s->top++;
s->data[s->top]=da;

printf("%d is Pushed in Stack ",da);

}

void pop(struct stack *s){
    int r;
    r = s->data[s->top];
    s->top--;
    printf("%d is Poped Element From Stack \n",r);
}
int isFull(struct stack *s){
    if(s->top==MAX-1){
        return 1;
    }
    else{
        return 0;
    }
}
int isEmpty(struct stack *s){
    if(s->top==-1){
        return 1;
    }
    else{
        return 0;
    }
}
void display(struct stack *s){
    int i;
    for(i=s->top;i>=0;i--){
        printf("%d\n",s->data[s->top]);
    }
}
void peek(struct stack *s){
    printf("%d is Top Most Element ",s->data[s->top]);
}
int main()
{
    struct stack s;
    int choice;
    intii(&s);

    while (1)
    {
     
        printf("\n\n1. Push");
        printf("\n2. Pop");
        printf("\n3. Display");
        printf("\n4. Peek");
        printf("\n5. isFull");
        printf("\n6. isEmpty");
        printf("\n7. Exit");
        printf("\nEnter Choice : ");
        scanf("%d", &choice);
        printf("\n");
        switch (choice)
        {
        case 1:
            if (isFull(&s) == 0)
            {
                push(&s);
            }
            else
            {
                printf("Stack is Full\n");
            }
            break;

        case 2:
            if (isEmpty(&s) == 0)
            {
                pop(&s);
            }
            else
            {
                printf("Stack is Empty\n");
            }
            break;

        case 3:
            if (isEmpty(&s) == 0)
            {
                display(&s);
            }
            else
            {
                printf("Stack is Empty \n");
            }
            break;

        case 4:
            if (isEmpty(&s) == 0)
            {
                peek(&s);
            }
            else
            {
                printf("Stack is Empty\n");
            }
            break;

        case 5:
            if (isFull(&s) == 0)
            {
                printf("Stack is Not Full \n");
            }
            else
            {
                printf("Stack is Full\n");
            }
            break;

        case 6:
            if (isEmpty(&s) == 0)
            {
                printf("Stack is Not Empty \n");
            }
            else
            {
                printf("Stack is Empty\n");
            }
            break;
        case 7:
            return 0;

        default:
            printf("Enter Valid Choice");
        }
    }
    return 0;
}