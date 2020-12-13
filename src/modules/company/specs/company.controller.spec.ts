import { Test, TestingModule } from '@nestjs/testing'

import { CompanyController } from 'src/modules/company/company.controller'
import { CompanyService } from 'src/modules/company/company.service'

describe('companyController', () => {
    let controller: CompanyController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompanyController],
            providers: [CompanyService],
        }).compile()

        controller = module.get<CompanyController>(CompanyController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
