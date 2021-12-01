import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../crudservice/crud.service';
import { EmployeeDetails } from './table.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  employeeModelObj: EmployeeDetails = new EmployeeDetails();
  employeeDetails !:any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private fb: FormBuilder, private api: CrudService) { }
  

  ngOnInit(): void {
    this.getAllEmployee()
  }

  userForm = this.fb.group({
    title: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    
  })

  clickAddEmployee(){
    this.userForm.reset();
    this.showAdd= true;
    this.showUpdate = false;
  }

  clearClose(){
    this.userForm.reset()
  }

  postEmployeeDetails(){
    this.employeeModelObj.title = this.userForm.value.title;
    this.employeeModelObj.firstName = this.userForm.value.firstName;
    this.employeeModelObj.lastName = this.userForm.value.lastName;
    this.employeeModelObj.email = this.userForm.value.email;
    this.employeeModelObj.gender = this.userForm.value.gender;
    this.employeeModelObj.mobile = this.userForm.value.mobile;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      // console.log(res)
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
  
  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeDetails = res;
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe(
      res=>{ alert('Employee detail is deleted')}
    )
    this.getAllEmployee()
    let close1 = document.getElementById('close')
    close1?.click()
   
  }

  onEdit(row: any){
    this.employeeModelObj.id= row.id;
    this.userForm.controls['title'].setValue(row.title)
    this.userForm.controls['firstName'].setValue(row.firstName)
    this.userForm.controls['lastName'].setValue(row.lastName)
    this.userForm.controls['email'].setValue(row.email)
    this.userForm.controls['gender'].setValue(row.gender)
    this.userForm.controls['mobile'].setValue(row.mobile)
    this.showAdd= false;
    this.showUpdate = true;
  }

  updateEmployee(){
    this.employeeModelObj.title = this.userForm.value.title;
    this.employeeModelObj.firstName = this.userForm.value.firstName;
    this.employeeModelObj.lastName = this.userForm.value.lastName;
    this.employeeModelObj.email = this.userForm.value.email;
    this.employeeModelObj.gender = this.userForm.value.gender;
    this.employeeModelObj.mobile = this.userForm.value.mobile;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{ 
      alert('Employee details update succeesfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset()
      this.getAllEmployee()
    })
  }
  
  onSubmit(){
    // console.log(this.userForm)
  }
}
