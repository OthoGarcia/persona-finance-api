import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryRepository extends Repository<Category>{
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager())
  }

  async getCategoryLevel(parentId: number): Promise<any> {
    return this.query(`
      WITH RECURSIVE rectree AS (
        SELECT c.id,
          c.parentId,
          c.name
            FROM category c
      UNION ALL 
        SELECT 
            t.id,
          t.parentId,
          t.name
          FROM category t 
          JOIN rectree
            ON t.parentId  = rectree.id
      ) SELECT COUNT(id) as 'level', id, name  FROM rectree where id = ? group by id, parentId, name;
      `, [parentId])
  }
}