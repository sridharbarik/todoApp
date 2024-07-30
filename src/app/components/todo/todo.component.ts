import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { iTask } from 'src/app/model/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
todoForm!:FormGroup;
task:iTask[]=[];
inProgress:iTask[]=[];
done:iTask[]=[];
updateId:any;
isEnabled:boolean = false;
constructor(private fb:FormBuilder){}
ngOnInit(): void {
  this.todoForm = this.fb.group({
    item:new FormControl("",[Validators.required])
  })
}
drop(event: CdkDragDrop<iTask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
addTask(){
  this.task.push({
    description:this.todoForm.value.item,
    done:false
  })
  this.todoForm.reset()
}
onDeleteTask(i:number){
  this.task.splice(i,1)
}
onDeleteinProgrssTask(i:number){
  this.inProgress.splice(i,1)
}
onDeleteindoneTask(i:number){
  this.done.splice(i,1)
}
onUpdateTask(item:iTask,i:number){
this.todoForm.controls['item'].setValue(item.description);
this.updateId = i;
this.isEnabled = true;
}

updateTask(){
this.task[this.updateId].description = this.todoForm.value.item;
this.task[this.updateId].done = false;
this.todoForm.reset();
this.isEnabled = false;
}
}
