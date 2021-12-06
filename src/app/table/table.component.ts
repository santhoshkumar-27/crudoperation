import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crudservice/crud.service';
import { EmployeeDetails } from './table.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  rows:number = 0;
  idNow !: number;
  submitted = false;
  // userForm!:FormGroup;
  employeeModelObj: EmployeeDetails = new EmployeeDetails();
  employeeDetails !:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  // constructor user to inject the other dependencies
  constructor(private fb: FormBuilder, private api: CrudService) { }
  // call employee details via api to show on view
  ngOnInit(): void {
    this.getAllEmployee()
    // console.log(this.userForm)
    // this.userForm = this.fb.group({
    //   title: ['', [Validators.required]],
    //   firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    //   lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
    //   email: ['', [Validators.required, Validators.email]],
    //   gender: ['', [Validators.required]],
    //   mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    // })
  }
  // Defining the userform using the formbuilder
  userForm = this.fb.group({
    title: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  })
  //click to show the modal view of userform
  clickAddEmployee(){
    this.userForm.reset();
    this.showAdd= true;
    this.showUpdate = false;
    this.submitted = false;
  }
  //this function clear the value in input field after closing
  clearClose(){
    this.userForm.reset()
  }
  //patching the value to object
  getId(){
    return this.idNow = Date.now()
  }
  postEmployeeDetails(){
    this.employeeModelObj.id = this.getId()
    this.employeeModelObj.title = this.userForm.value.title;
    this.employeeModelObj.firstName = this.userForm.value.firstName;
    this.employeeModelObj.lastName = this.userForm.value.lastName;
    this.employeeModelObj.email = this.userForm.value.email;
    this.employeeModelObj.gender = this.userForm.value.gender;
    this.employeeModelObj.mobile = this.userForm.value.mobile;
    //post method calling
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      // console.log('res in post employe', res);
      alert("Employee added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset()
      this.getAllEmployee()
    },
    err=>{
      alert('something went wrong')
    })
  }
  // Get method gives the employeedetails
  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      // console.log('res in get method patchValue', res);
      this.employeeDetails = res;
    })
  }
  // Delete method delete the particular object
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe(
      res=>{ alert('Employee detail is deleted')},
      err=>{ alert('Delete not done')}
    )
    this.getAllEmployee()
    let close1 = document.getElementById('close')
    close1?.click()
   
  }
  // this method to show value in edit modal
  onEdit(row: any){
    // console.log(row.id)
    this.employeeModelObj.id = row.id;
    this.userForm.controls['title'].setValue(row.title)
    this.userForm.controls['firstName'].setValue(row.firstName)
    this.userForm.controls['lastName'].setValue(row.lastName)
    this.userForm.controls['email'].setValue(row.email)
    this.userForm.controls['gender'].setValue(row.gender)
    this.userForm.controls['mobile'].setValue(row.mobile)
    this.showAdd= false;
    this.showUpdate = true;
  }
  // this method update new value after editing done on the editmodalview
  updateEmployee(){
    this.employeeModelObj.title = this.userForm.value.title;
    this.employeeModelObj.firstName = this.userForm.value.firstName;
    this.employeeModelObj.lastName = this.userForm.value.lastName;
    this.employeeModelObj.email = this.userForm.value.email;
    this.employeeModelObj.gender = this.userForm.value.gender;
    this.employeeModelObj.mobile = this.userForm.value.mobile;
    // console.log(this.employeeModelObj.id)
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{ 
      alert('Employee details update succeesfully') 
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset()
      this.getAllEmployee()
    })
  }
  // get fu(){
  //   return this.userForm
  // }
  get f(){
    return this.userForm.controls
    
  }
  onPost(){
    if(this.userForm.status === "VALID"){
      this.postEmployeeDetails()
    }
  }
  onSubmit(){
    this.submitted = true;
  //   // console.log(this.getId())
  //   console.log("this is submitted",this.userForm)
  //   if(this.userForm.status === "VALID"){
  //     // console.log(this.getId())
  //     // this.postEmployeeDetails()
  //   }
  }
}
