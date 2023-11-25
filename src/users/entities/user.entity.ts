import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  @Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    Name: string;

    @Column({ nullable: true })
    email: string;
  
    @Column({nullable:true})
    password: string;

    @ManyToOne(() => Roles, (role) => role.id)
    @JoinColumn({ name: 'roleId' })
    roleId: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
  
    @Column({ nullable: true })
    deletedBy: string;
}

@Entity('role')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'createdBy' })
  createdBy: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'updateBy' })
  updateBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'deletedBy' })
  deletedBy: number;

}
 @Entity('task')
  export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;

    @Column({nullable:true})
    projectName: string;
  
    @Column({nullable:true})
    Task: string;
  
    @CreateDateColumn()
    startDate: Date;

    @CreateDateColumn()
    endDate: Date;

    @ManyToOne(() => status, (status) => status.id)
    @JoinColumn({ name: 'status' })
    status: number;
  

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: number;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    updateBy: number;
  
  
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    deletedBy: number;
  }
  @Entity('status')
  export class status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    status: string;


    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: number;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    updateBy: number;
  
  
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    deletedBy: number;

  }
  