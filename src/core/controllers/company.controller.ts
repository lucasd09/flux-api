import { Hono } from "hono";
import { CompanyService } from "../services/company.service";
import { zValidator } from "@hono/zod-validator";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../models/company.model";

const companyController = new Hono();
const companyService = new CompanyService();

companyController.get("/", async (c) => {
  const includeInactive = c.req.query("includeInactive") === "true";
  const companies = await companyService.getAllCompanies(includeInactive);

  return c.json({
    success: true,
    data: companies,
  });
});

companyController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const company = await companyService.getCompanyById(id);

    return c.json({
      success: true,
      data: company,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

companyController.get("/slug/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const company = await companyService.getCompanyBySlug(slug);

    return c.json({
      success: true,
      data: company,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

companyController.post(
  "/",
  zValidator("json", createCompanySchema),
  async (c) => {
    try {
      const data = await c.req.json();
      const company = await companyService.createCompany(data);

      return c.json(
        {
          success: true,
          data: company,
        },
        201,
      );
    } catch (error) {
      if (error.name === "ConflictError") {
        return c.json({ success: false, message: error.message }, 409);
      }
      return c.json({ success: false, message: "An error occurred" }, 500);
    }
  },
);

companyController.put(
  "/:id",
  zValidator("json", updateCompanySchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const company = await companyService.updateCompany(id, data);

      return c.json({
        success: true,
        data: company,
      });
    } catch (error) {
      if (error.name === "NotFoundError") {
        return c.json({ success: false, message: error.message }, 404);
      }
      if (error.name === "ConflictError") {
        return c.json({ success: false, message: error.message }, 409);
      }
      return c.json({ success: false, message: "An error occurred" }, 500);
    }
  },
);

companyController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await companyService.deleteCompany(id);

    return c.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

companyController.patch("/:id/deactivate", async (c) => {
  try {
    const id = c.req.param("id");
    const company = await companyService.deactivateCompany(id);

    return c.json({
      success: true,
      data: company,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

companyController.patch("/:id/activate", async (c) => {
  try {
    const id = c.req.param("id");
    const company = await companyService.activateCompany(id);

    return c.json({
      success: true,
      data: company,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

export { companyController };
