import { RepositoryMemoryModule } from "@/repositories/modules/repository-memory"
import { RepositoryTypeormModule } from "@/repositories/modules/repository-typeorm"


export const getRepositoryModule = () => {
    const repositories = new Map()
    repositories.set('MEMORY', RepositoryMemoryModule)
    repositories.set('TYPEORM', RepositoryTypeormModule)
    const connectionType = process.env.CONNECTION_TYPE || 'MEMORY'
    return repositories.get(connectionType)
}
export default () => ({});