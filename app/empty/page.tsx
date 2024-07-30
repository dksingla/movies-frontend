import Button from "../components/Button"

export default function emptyState() {
   return(
    <div className="flex flex-col min-h-screen items-center justify-center bg-background ">
                <h6 className="text-6xl font-medium   mb-8 text-center text-yellow-50">Your movie list is empty</h6>
                <Button className="text-sm text-yellow-50  font-bold mt-4 w-[240px]" text="Add a new movie" type="button"></Button>

      

    </div>
   )
}