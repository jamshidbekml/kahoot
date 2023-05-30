import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Quiz {
    @PrimaryGeneratedColumn()
    public id!: number;
  
    @Column({ type: 'varchar', length: 120 })
    public name: string;
  
    @Column({ type: 'varchar', length: 120})
    public category: string;
  
    @Column({ type: 'varchar', length: 120})
    public creator: string;
  
    @Column({ type: 'varchar', length: 120, nullable: true })
    public resetToken: string;
  
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    public resetTokenExpires: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
  }
  